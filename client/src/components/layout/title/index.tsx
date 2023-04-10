import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
//5.
import { logo, yariga } from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Metagig" width="48px" />
        ) : (
          <img src={yariga} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
