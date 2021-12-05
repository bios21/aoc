import { getInputAsArray } from "../utils.ts";

// const data = ["2x3x4", "1x1x10"];
const data = await getInputAsArray();

interface Dimension {
  l: number;
  w: number;
  h: number;
}
const dimensions: Dimension[] = data.map((dim) => {
  const [l, w, h] = dim.split("x").map(Number);
  return { l, w, h };
});

const getSurfaceArea = ({ l, w, h }: Dimension) => {
  const topBottomSurface = l * w;
  const rightLeftSurface = w * h;
  const frontBackSurface = h * l;
  return {
    area: (2 * topBottomSurface) + (2 * rightLeftSurface) +
      (2 * frontBackSurface),
    extra: Math.min(topBottomSurface, rightLeftSurface, frontBackSurface),
  };
};

const totalPaper = dimensions.reduce((count, dim) => {
  const { area, extra } = getSurfaceArea(dim);
  return count + area + extra;
}, 0);

const totalRibon = dimensions.reduce(
  (count, { l, w, h }) =>
    count + Math.min(2 * (l + w), 2 * (l + h), 2 * (w + h)) + (l * w * h),
  0,
);

console.log({ totalPaper, totalRibon });
