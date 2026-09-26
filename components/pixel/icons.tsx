import React from "react";
import { Search } from "pixelarticons/react/Search";
import { Close } from "pixelarticons/react/Close";
import { Check } from "pixelarticons/react/Check";
import { ChevronDown } from "pixelarticons/react/ChevronDown";
import { ChevronUp } from "pixelarticons/react/ChevronUp";
import { ChevronLeft } from "pixelarticons/react/ChevronLeft";
import { ChevronRight } from "pixelarticons/react/ChevronRight";
import { Volume2 } from "pixelarticons/react/Volume2";
import { VolumeX } from "pixelarticons/react/VolumeX";
import { InfoBox } from "pixelarticons/react/InfoBox";
import { WarningDiamond } from "pixelarticons/react/WarningDiamond";
import { SquareAlert } from "pixelarticons/react/SquareAlert";

/**
 * Pixel art icons sourced from https://pixelarticons.com/ (pixelarticons package)
 * Handcrafted on a 24x24 grid for authentic 8-bit / 16-bit retro UI aesthetics.
 */
export const PixelSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Search shapeRendering="crispEdges" {...props} />
);

export const PixelCloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Close shapeRendering="crispEdges" {...props} />
);

export const PixelCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Check shapeRendering="crispEdges" {...props} />
);

export const PixelChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronDown shapeRendering="crispEdges" {...props} />
);

export const PixelChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronUp shapeRendering="crispEdges" {...props} />
);

export const PixelChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronLeft shapeRendering="crispEdges" {...props} />
);

export const PixelChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronRight shapeRendering="crispEdges" {...props} />
);

export const PixelVolume2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <Volume2 shapeRendering="crispEdges" {...props} />
);

export const PixelVolumeXIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <VolumeX shapeRendering="crispEdges" {...props} />
);

export const PixelInfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <InfoBox shapeRendering="crispEdges" {...props} />
);

export const PixelWarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <WarningDiamond shapeRendering="crispEdges" {...props} />
);

export const PixelAlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <SquareAlert shapeRendering="crispEdges" {...props} />
);
