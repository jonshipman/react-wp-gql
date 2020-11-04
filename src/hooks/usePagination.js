import { useCallback, useMemo, useState } from "react";

export const getPageInfo = (
  pageInfo = {
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  },
) => pageInfo;

export const useNavigation = ({ goNext, endCursor, goPrev, startCursor }) => {
  const next = useCallback(() => {
    goNext(endCursor);
  }, [goNext, endCursor]);

  const prev = useCallback(() => {
    goPrev(startCursor);
  }, [goPrev, startCursor]);

  return { prev, next };
};

export const usePagination = (perPage = 10) => {
  const [cursor, setCursor] = useState();
  const [direction, setDirection] = useState();

  const variables = useMemo(() => {
    const _v = {};

    if (!direction) {
      _v.first = perPage;
    } else if (direction < 0) {
      _v.last = perPage;
      _v.before = cursor;
    } else if (direction > 0) {
      _v.first = perPage;
      _v.after = cursor;
    }

    return _v;
  }, [direction, cursor, perPage]);

  const goNext = useCallback(
    (endCursor) => {
      setDirection(1);
      setCursor(endCursor);
      window.scrollTo(0, 0);
    },
    [setDirection, setCursor],
  );

  const goPrev = useCallback(
    (startCursor) => {
      setDirection(-1);
      setCursor(startCursor);
      window.scrollTo(0, 0);
    },
    [setDirection, setCursor],
  );

  return {
    variables,
    direction,
    cursor,
    goNext,
    goPrev,
  };
};
