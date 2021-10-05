import React from "react";

import Button from "common/components/Button";

interface IAccountComponent {
  translations: { logout: string };
  logout: () => void;
}

const AccountComponent: React.FC<IAccountComponent> = ({
  translations,
  logout,
}) => {
  return (
    <div>
      <Button label={translations.logout} onClick={logout} />
    </div>
  );
};

export default AccountComponent;
