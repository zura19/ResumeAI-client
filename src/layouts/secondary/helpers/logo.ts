const hiddenLogoRoutes = ["/google/callback"];

export function showLogo(pathname: string) {
  return !hiddenLogoRoutes.includes(pathname);
}
