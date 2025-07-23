{
  description = "Development flake for Quacken development";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let pkgs = nixpkgs.legacyPackages.x86_64-linux; in {
    devShells.x86_64-linux.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        ergogen  # Ergonomic keyboard generator
        kicad    # Electronics design suite
        freecad  # Fancy PCB outline / case design
      ];
    };
  };
}
