export function getShotInsights(xg) {
  if (xg < 0.1) {
    return "This was an extremely difficult chance.";
  }
  if (xg < 0.3) {
    return "The shooter had a low probability scoring opportunity.";
  }
  if (xg < 0.5) {
    return "This was a decent attacking opportunity.";
  }
  if (xg < 0.7) {
    return "A high quality chance was created.";
  }

  return "This should almost always result in a goal.";
}
