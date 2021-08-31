import styled from "styled-components";
import React, { useState } from "react";

const Videos = ({ result }) => {
  const [page, setPage] = useState(1);
  const {
    videos: { results },
  } = result;

  return (
    <>
      {results.length > 0 ? (
        <IFRAME
          frameBorder="0"
          src={`https://youtube.com/embed/${results[page - 1]?.key}`}
        />
      ) : (
        <h2>Video Not Found</h2>
      )}

      <Pagination>
        {results && results.length > 0 && (
          <>
            {page > 0 && (
              <button onClick={() => setPage((prev) => prev - 1)}>
                <i className="fas fa-chevron-left fa-5x"></i>
              </button>
            )}

            {page < results.length - 1 && (
              <button onClick={() => setPage((prev) => prev + 1)}>
                <i className="fas fa-chevron-right fa-5x"></i>
              </button>
            )}
          </>
        )}
      </Pagination>
    </>
  );
};

export default Videos;

const IFRAME = styled.iframe`
  position: absolute;
  width: 100%;
  height: 95%;
`;

const Pagination = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  right: 30px;
  bottom: 40%;

  button {
    background-color: inherit;
    border: none;

    &:hover {
      border: solid;
    }
  }

  i.fa-chevron-right {
    color: white;
    opacity: 0.5;
    position: absolute;
    bottom: 40%;
    right: -80px;
    z-index: 9;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }

  i.fa-chevron-left {
    color: white;
    position: absolute;
    opacity: 0.5;
    bottom: 40%;
    left: -10px;
    z-index: 9;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }
`;
