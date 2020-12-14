import React from "react";

interface Props {
  user: string;
  imageStyle?: string;
  css?: object;
}

const BuyMeACoffeeButton: React.FC<Props> = ({
  user,
  imageStyle = "default-yellow",
  css, //{ height: "60px", width: "217px" }
}) => {
  return (
    <a
      href={`https://www.buymeacoffee.com/${user}`}
      target="_blank"
      rel="noreferrer"
      className="buymeacoffee-button"
    >
      <img
        src={`https://cdn.buymeacoffee.com/buttons/v2/${imageStyle}.png`}
        alt="Buy Me A Coffee"
        {...(css && { style: css })}
      />
    </a>
  );
};

export default BuyMeACoffeeButton;
