class Ibsca < Formula
  desc "A simple CLI"
  homepage "https://github.com/Howl1935/ibsca-cli"
  url "https://github.com/Howl1935/ibsca-cli/releases/download/v1.0.9/ibsca-macos-x64.tar.gz"
  sha256 "f96264058922671938d166a4ec79eb7256d3144c8831cca93b294e98292a51fe"
  version "1.0.9"  
  
  def install
    bin.install "ibsca"
  end
end
