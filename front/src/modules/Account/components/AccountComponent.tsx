import React from "react";

import Button from "common/components/Button";

interface AccountComponentProps {
  translations: any;
  logout: () => void;
}

const AccountComponent: React.FC<AccountComponentProps> = ({
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
