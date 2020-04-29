import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";



const Loader = () => {

  const override = css`
  display: block;
  margin: 0 auto;
  overflow: hidden;
  `;

  return (
    <div className="sweet-loading">
    <RingLoader
    css={override}
    size={250}
    color={"#123abc"}
    loading={true}
    />
    </div>
    );
}


export default Loader;