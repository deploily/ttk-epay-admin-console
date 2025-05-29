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