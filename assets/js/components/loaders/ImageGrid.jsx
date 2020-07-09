import React from "react";
import ContentLoader from "react-content-loader";

const ImageGrid = (props) => (
  <ContentLoader
    speed={2}
    width={1140}
    height={713}
    viewBox="0 0 1140 713"
    style={{ width: "100%", height: "100%" }}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-1" y="345" rx="0" ry="0" width="550" height="300" />
    <rect x="560" y="345" rx="0" ry="0" width="565" height="300" />
    <rect x="-5" y="30" rx="0" ry="0" width="550" height="300" />
    <rect x="560" y="30" rx="0" ry="0" width="565" height="300" />
  </ContentLoader>
);

export default ImageGrid;
