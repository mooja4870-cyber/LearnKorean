#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-$HOME/Library/Android/sdk}}"
SDK_CMDLINE_LATEST="$SDK_ROOT/cmdline-tools/latest"
OPENJDK17_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
AVD_NAME="Antigravity_API35"
STATE_FILE="$SDK_ROOT/.antigravity_system_image_failed"

if [ -x "$OPENJDK17_HOME/bin/java" ]; then
  export JAVA_HOME="$OPENJDK17_HOME"
  export PATH="$JAVA_HOME/bin:$PATH"
fi

export ANDROID_HOME="$SDK_ROOT"
export ANDROID_SDK_ROOT="$SDK_ROOT"
export PATH="$SDK_CMDLINE_LATEST/bin:$SDK_ROOT/platform-tools:$SDK_ROOT/emulator:$PATH"

AVDMANAGER="$SDK_CMDLINE_LATEST/bin/avdmanager"

wait_for_emulator_serial() {
  local timeout=180
  local elapsed=0
  local serial=""
  while [ "$elapsed" -lt "$timeout" ]; do
    serial="$(adb devices | awk 'NR>1 && $1 ~ /^emulator-[0-9]+$/ {print $1; exit}')"
    if [ -n "$serial" ]; then
      printf '%s\n' "$serial"
      return 0
    fi
    sleep 2
    elapsed=$((elapsed + 2))
  done
  return 1
}

wait_for_android_runtime() {
  local serial="$1"
  local boot_timeout=300
  local service_timeout=180
  local elapsed=0

  echo "Waiting for Android boot completion on $serial..."
  until adb -s "$serial" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' | grep -q "1"; do
    sleep 2
    elapsed=$((elapsed + 2))
    if [ "$elapsed" -ge "$boot_timeout" ]; then
      echo "Timed out waiting for emulator boot completion."
      return 1
    fi
  done

  elapsed=0
  echo "Waiting for Package Manager service..."
  until adb -s "$serial" shell pm path android >/dev/null 2>&1; do
    sleep 2
    elapsed=$((elapsed + 2))
    if [ "$elapsed" -ge "$service_timeout" ]; then
      echo "Timed out waiting for Android package service."
      return 1
    fi
  done
}

if [ ! -x "$SDK_ROOT/emulator/emulator" ] || [ ! -x "$AVDMANAGER" ]; then
  echo "Android emulator binary not found. Running setup..."
  "$ROOT_DIR/scripts/android-setup.sh"
fi

needs_fallback=0
if ! "$AVDMANAGER" list avd | grep -q "Name: $AVD_NAME"; then
  if [ -f "$STATE_FILE" ]; then
    echo "AVD '$AVD_NAME' unavailable and recent system image download failed."
    echo "Skipping retry and falling back to Expo Go QR flow."
    needs_fallback=1
  else
    echo "AVD '$AVD_NAME' not found. Running setup..."
    "$ROOT_DIR/scripts/android-setup.sh"
  fi
fi

if [ "$needs_fallback" -eq 1 ]; then
  echo "Falling back to Expo Go QR flow."
  cd "$ROOT_DIR"
  pids=$(lsof -tiTCP:8081 -sTCP:LISTEN || true)
  if [ -n "${pids:-}" ]; then
    kill -9 $pids || true
  fi
  EXPO_NO_TELEMETRY=1 npx expo start --host lan --clear --port 8081
  exit 0
fi

if ! "$AVDMANAGER" list avd | grep -q "Name: $AVD_NAME"; then
  echo "AVD still unavailable. Falling back to Expo Go QR flow."
  cd "$ROOT_DIR"
  pids=$(lsof -tiTCP:8081 -sTCP:LISTEN || true)
  if [ -n "${pids:-}" ]; then
    kill -9 $pids || true
  fi
  EXPO_NO_TELEMETRY=1 npx expo start --host lan --clear --port 8081
  exit 0
fi

emulator_serial="$(adb devices | awk 'NR>1 && $1 ~ /^emulator-[0-9]+$/ {print $1; exit}')"
if [ -z "$emulator_serial" ]; then
  if pgrep -f "qemu-system-.*-avd $AVD_NAME" >/dev/null 2>&1; then
    echo "Emulator process already running. Waiting for adb registration..."
  else
    echo "Starting Android emulator: $AVD_NAME"
    nohup "$SDK_ROOT/emulator/emulator" -avd "$AVD_NAME" -netdelay none -netspeed full >/tmp/antigravity-emulator.log 2>&1 &
  fi
  adb start-server >/dev/null 2>&1 || true
  emulator_serial="$(wait_for_emulator_serial || true)"
fi

if [ -z "$emulator_serial" ]; then
  echo "Emulator did not register with adb. Falling back to Expo Go QR flow."
  cd "$ROOT_DIR"
  pids=$(lsof -tiTCP:8081 -sTCP:LISTEN || true)
  if [ -n "${pids:-}" ]; then
    kill -9 $pids || true
  fi
  EXPO_NO_TELEMETRY=1 npx expo start --host lan --clear --port 8081
  exit 0
fi

if ! wait_for_android_runtime "$emulator_serial"; then
  echo "Emulator boot is unstable. Falling back to Expo Go QR flow."
  cd "$ROOT_DIR"
  pids=$(lsof -tiTCP:8081 -sTCP:LISTEN || true)
  if [ -n "${pids:-}" ]; then
    kill -9 $pids || true
  fi
  EXPO_NO_TELEMETRY=1 npx expo start --host lan --clear --port 8081
  exit 0
fi

cd "$ROOT_DIR"
pids=$(lsof -tiTCP:8081 -sTCP:LISTEN || true)
if [ -n "${pids:-}" ]; then
  kill -9 $pids || true
fi

if adb -s "$emulator_serial" shell pm list packages host.exp.exponent | grep -q "host.exp.exponent"; then
  (
    sleep 4
    adb -s "$emulator_serial" shell am start \
      -a android.intent.action.VIEW \
      -d "exp://127.0.0.1:8081" \
      host.exp.exponent/.experience.HomeActivity >/tmp/antigravity-expo-open.log 2>&1 || true
  ) &
else
  echo "Expo Go is not installed on emulator. Starting Metro only (QR fallback available)."
fi

EXPO_NO_TELEMETRY=1 npx expo start --host localhost --clear --port 8081
