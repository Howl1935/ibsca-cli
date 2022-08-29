class Ibsca < Formula
  desc "A simple CLI"
  homepage "https://github.com/Howl1935/ibsca-cli"
  url "https://github.com/Howl1935/ibsca-cli/releases/download/v1.1.0/ibsca-macos-x64.tar.gz"
  sha256 "5fad94675c23b9946a25d9565b155e98b92e9511d2fbca0697237be74334e404"
  version "1.1.0"  
  
  def install
    bin.install "ibsca"
  end
end
