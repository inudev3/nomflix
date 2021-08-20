import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content:25px;
    font-size:20px;
`;

const Loader = ()=><Container>Loading...⏰</Container>;
export default Loader;