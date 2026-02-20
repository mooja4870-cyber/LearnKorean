#!/usr/bin/env bash
set -euo pipefail

SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-$HOME/Library/Android/sdk}}"
BREW_CMDLINE_LATEST="/opt/homebrew/share/android-commandlinetools/cmdline-tools/latest"
SDK_CMDLINE_LATEST="$SDK_ROOT/cmdline-tools/latest"
SDK_CMDLINE_FALLBACK="$SDK_ROOT/cmdline-tools/latest-2"
OPENJDK17_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
SYSTEM_IMAGE="system-images;android-35;google_apis;arm64-v8a"
AVD_NAME="Antigravity_API35"
STATE_FILE="$SDK_ROOT/.antigravity_system_image_failed"

ensure_java_17() {
  if [ ! -x "$OPENJDK17_HOME/bin/java" ]; then
    if ! command -v brew >/dev/null 2>&1; then
      echo "Homebrew is required to install openjdk@17 automatically."
      exit 1
    fi
    echo "Installing openjdk@17..."
    brew install openjdk@17
  fi

  export JAVA_HOME="$OPENJDK17_HOME"
  export PATH="$JAVA_HOME/bin:$PATH"
}

ensure_sdk_cmdline_tools() {
  mkdir -p "$SDK_ROOT/cmdline-tools"

  bootstrap_sdk_cmdline_tools() {
    if [ ! -x "$BREW_CMDLINE_LATEST/bin/sdkmanager" ]; then
      echo "Missing bootstrap sdkmanager at: $BREW_CMDLINE_LATEST"
      echo "Install with: brew install android-commandlinetools"
      exit 1
    fi

    "$BREW_CMDLINE_LATEST/bin/sdkmanager" --sdk_root="$SDK_ROOT" "cmdline-tools;latest"
  }

  # Brew symlinked "latest" often causes AVD package path parsing failures.
  if [ -L "$SDK_CMDLINE_LATEST" ]; then
    if [ ! -d "$SDK_CMDLINE_FALLBACK/bin" ]; then
      bootstrap_sdk_cmdline_tools
    fi
    if [ -d "$SDK_CMDLINE_FALLBACK/bin" ]; then
      rm -f "$SDK_CMDLINE_LATEST"
      mv "$SDK_CMDLINE_FALLBACK" "$SDK_CMDLINE_LATEST"
    fi
  fi

  if [ ! -x "$SDK_CMDLINE_LATEST/bin/sdkmanager" ]; then
    bootstrap_sdk_cmdline_tools
    if [ -L "$SDK_CMDLINE_LATEST" ] && [ -d "$SDK_CMDLINE_FALLBACK/bin" ]; then
      rm -f "$SDK_CMDLINE_LATEST"
      mv "$SDK_CMDLINE_FALLBACK" "$SDK_CMDLINE_LATEST"
    fi
  fi

  if [ ! -x "$SDK_CMDLINE_LATEST/bin/sdkmanager" ]; then
    echo "Failed to install SDK cmdline-tools into: $SDK_CMDLINE_LATEST"
    exit 1
  fi
}

ensure_java_17
ensure_sdk_cmdline_tools

export ANDROID_HOME="$SDK_ROOT"
export ANDROID_SDK_ROOT="$SDK_ROOT"
export PATH="$SDK_CMDLINE_LATEST/bin:$SDK_ROOT/platform-tools:$SDK_ROOT/emulator:$PATH"

SDKMANAGER="$SDK_CMDLINE_LATEST/bin/sdkmanager"
AVDMANAGER="$SDK_CMDLINE_LATEST/bin/avdmanager"

install_with_retry() {
  local attempts=3
  local count=1
  until "$SDKMANAGER" --sdk_root="$SDK_ROOT" "$@"; do
    if [ "$count" -ge "$attempts" ]; then
      echo "sdkmanager failed after $attempts attempts: $*"
      return 1
    fi
    count=$((count + 1))
    echo "Retrying sdkmanager ($count/$attempts): $*"
    sleep 3
  done
}

install_optional_with_retry() {
  local attempts=3
  local count=1
  until "$SDKMANAGER" --sdk_root="$SDK_ROOT" "$@"; do
    if [ "$count" -ge "$attempts" ]; then
      echo "Optional package download failed after $attempts attempts: $*"
      return 1
    fi
    count=$((count + 1))
    echo "Retrying optional sdkmanager package ($count/$attempts): $*"
    sleep 3
  done
}

echo "Android SDK root: $SDK_ROOT"
yes | "$SDKMANAGER" --sdk_root="$SDK_ROOT" --licenses >/dev/null || true
install_with_retry \
  "cmdline-tools;latest" \
  "platform-tools" \
  "platforms;android-35" \
  "build-tools;35.0.0" \
  "emulator"

if install_optional_with_retry "$SYSTEM_IMAGE"; then
  rm -f "$STATE_FILE"
  if ! "$AVDMANAGER" list avd | grep -q "Name: $AVD_NAME"; then
    echo "Creating AVD: $AVD_NAME"
    if echo "no" | "$AVDMANAGER" create avd \
      -n "$AVD_NAME" \
      -k "$SYSTEM_IMAGE" \
      --device "pixel_7" \
      --force; then
      echo "AVD created: $AVD_NAME"
    else
      touch "$STATE_FILE"
      echo "AVD creation failed (toolchain inconsistency)."
      echo "Fallback mode enabled: physical Android device via Expo Go QR."
    fi
  fi
else
  touch "$STATE_FILE"
  echo "System image could not be downloaded now."
  echo "You can still run on a physical Android device via Expo Go (QR)."
fi

echo "Android setup completed."
echo "Add these lines to ~/.zshrc for persistence:"
echo "export JAVA_HOME=\"$OPENJDK17_HOME\""
echo "export ANDROID_HOME=\"$SDK_ROOT\""
echo "export ANDROID_SDK_ROOT=\"$SDK_ROOT\""
echo "export PATH=\"\$JAVA_HOME/bin:\$ANDROID_SDK_ROOT/platform-tools:\$ANDROID_SDK_ROOT/emulator:\$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:\$PATH\""
