import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { IoMdHome } from "react-icons/io";
import { FaStore } from "react-icons/fa6";
import { SlBookOpen } from "react-icons/sl";

import { Link } from "react-router-dom";
import UserContext from "../../store/userContext";
// import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { user_id } = useContext(UserContext);

  const propsToPass = {
    user_id: user_id,
    business_id: props.id,
    name: props.name,
  };

  return (
    <div>
      <div className="w-full bg-buttons flex flex-row justify-between p-5">
        <h1 className="text-xl font-serif font-semibold text-color1">
          BizManager
        </h1>
        {/* <div className="w-20">
       
      </div> */}
        <div className="flex flex-row justify-evenly align-middle space-x-5 text-chars">
          <div className="flex flex-row text-xl space-x-2 cursor-pointer hover:text-color1">
            <IoMdHome /> <Link to={"/dashboard"}>Home</Link>
          </div>
          {/* <div className="flex flex-row text-xl space-x-2 cursor-pointer hover:text-color1">
            <FaStore />
            <h2>Store</h2>
          </div> */}
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  color="success"
                  variant="text"
                  {...bindTrigger(popupState)}
                  startIcon={<FaStore />}
                  disableElevation
                >
                  Dashboard
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {/* <MenuItem onClick={popupState.close}>
                    Add Items
                    <Link to={"/addStock"}></Link>
                  </MenuItem> */}
                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/addStock/${propsToPass.business_id}/${propsToPass.user_id}`}
                  >
                    Add Stock
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/stock/${propsToPass.business_id}`}
                  >
                    Stock
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/dailyreport/${propsToPass.business_id}?name=${propsToPass.name}`}
                  >
                    Daily Details
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  color="success"
                  variant="text"
                  {...bindTrigger(popupState)}
                  startIcon={<SlBookOpen />}
                  disableElevation
                >
                  Accounts
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {/* <MenuItem onClick={popupState.close}>
                    Add Items
                    <Link to={"/addStock"}></Link>
                  </MenuItem> */}
                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/accounts/credits/${propsToPass.business_id}`}
                  >
                    Credits
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/accounts/cheques/${propsToPass.business_id}`}
                  >
                    Cheques
                  </MenuItem>
                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to={`/accounts/paysheet/${propsToPass.business_id}`}
                  >
                    Pay Sheets
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>Leger</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          {/* <h2>Accounts</h2>
          <h2>Accounts</h2>
          <h2>Accounts</h2> */}
        </div>
        <div className="text-stacks">
          Business Name:
          <span className="text-2xl text-chars">{props.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
