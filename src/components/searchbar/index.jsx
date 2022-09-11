import React from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;
const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled.span`
  color: #bebebe;
  font-size: 23px;
  margin-right: 40px;
  vertical-align: middle;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    color: #dfdfdf;
  }
`;
const SearchBar = () => {
    const [isExpanded, setExpanded] = useState(false);

    const expandContainer = ()=> {
        setExpanded(true)
    }
    const collapseContainer = ()=> {
        setExpanded(false)
    }
  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput placeholder="Search for Shows/Movies" onFocus={expandContainer}/>
        <CloseIcon>
          <IoClose />
        </CloseIcon>
      </SearchInputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
