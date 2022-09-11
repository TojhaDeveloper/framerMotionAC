import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside, useDebounceHook } from "../hooks";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";
import { TVShow } from "../tvshow/tvShow";

const SearchBarContainer = styled(motion.div)`
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

const CloseIcon = styled(motion.span)`
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

const containerVariants = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const SearchContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow: auto;
`;
const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const LoadingSpinnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const WarningMessage = styled.span`
  font-size: 14px;
  color: #a1a1a1;
  display: flex;
  align-self: center;
  justify-self: center;
`;
const containerTransition = { type: "spring", damping: 22, stiffness: 150 };
const SearchBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [noTvShows, setNoTvShows] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const isEmpty = !results || results.length === 0;
  const ref = useRef();
  const inputRef = useRef();

  const expandContainer = () => {
    setExpanded(true);
  };
  const collapseContainer = () => {
    setExpanded(false);
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
    setSearchQuery("");
    setResults([]);
    setNoTvShows(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") {
      setNoTvShows(false);
    }
    setSearchQuery(e.target.value);
  };

  useClickOutside(ref, useCallback(collapseContainer, []));

  const debouncedSearchQuery = useDebounceHook(searchQuery, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearchQuery || debouncedSearchQuery.trim() === "") {
        return;
      }
      const URL = `https://api.tvmaze.com/search/shows?q=${debouncedSearchQuery}`;
      const encodedURL = encodeURI(URL);
      setLoading(true);
      try {
        const response = await axios.get(encodedURL);
        if (response) {
          if (response.data && response.data.length === 0) {
            setNoTvShows(true);
          }
          console.log("DATA: ", response.data);
          setResults(response.data);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [debouncedSearchQuery]);
  return (
    <SearchBarContainer
      ref={ref}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          ref={inputRef}
          placeholder="Search for Shows/Movies"
          onFocus={expandContainer}
          value={searchQuery}
          onChange={handleChange}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opcaity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseContainer}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      <LineSeperator />
      <SearchContent>
        {isLoading && (
          <LoadingSpinnerDiv>
            <MoonLoader color="#000" size={20} loading />
          </LoadingSpinnerDiv>
        )}
        {!isLoading && isEmpty && !noTvShows && (
          <LoadingSpinnerDiv>
            <WarningMessage>Start typing to Search</WarningMessage>
          </LoadingSpinnerDiv>
        )}
        {!isLoading && noTvShows && (
          <LoadingSpinnerDiv>
            <WarningMessage>No Tv/Movies Found</WarningMessage>
          </LoadingSpinnerDiv>
        )}
        {!isLoading && !isEmpty && (
          <>
            {results.map(({ show: d }) => (
              <TVShow
                key={d.id}
                thumbNail={d.image?.medium}
                name={d.name}
                rating={d.rating?.average}
              />
            ))}
          </>
        )}
      </SearchContent>
    </SearchBarContainer>
  );
};

export default SearchBar;
