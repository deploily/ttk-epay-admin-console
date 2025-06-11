import { Button, Input } from "antd";
import styled from "styled-components";
import { theme } from "../theme";

export const CustomPrimaryButton = styled(Button)` &&
 {  
    color: ${theme.token.colorBlack};
    background-color: ${theme.token.blueOverlay};
    border: none;
    border-raduis:10px;
    padding: 10px 30px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.blueOverlay} !important;
      color: ${theme.token.colorBlack} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;

export const CustomButton = styled(Button)` &&
 {  
    color: ${theme.token.colorBlack};
    background-color: ${theme.token.skyBlue};
    border: none;
    border-raduis:8px;
    padding-inline: 20px;
    font-size: 15px;
    height: 40px;
    transition: background-color 0.3s ease;
                           

     &:hover {
      background-color: ${theme.token.skyBlue} !important;
      color: ${theme.token.colorBlack} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;