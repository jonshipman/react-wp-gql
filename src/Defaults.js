import { ArchiveCard } from "./elements/ArchiveCard";
import { ArchiveRender } from "./elements/ArchiveRender";
import { Button } from "./elements/Button";
import { ErrorRouting } from "./elements/ErrorRouting";
import { Loading } from "./elements/Loading";
import { LoadingError } from "./elements/LoadingError";
import { NotFound } from "./elements/NotFound";
import { PageWidth } from "./elements/PageWidth";
import { Pagination } from "./elements/Pagination";
import { PostContent } from "./elements/PostContent";
import { ReactComponent as ClockIcon } from "./static/images/clock.svg";
import { ReactComponent as FolderIcon } from "./static/images/folder.svg";
import { Seo } from "./elements/Seo";
import { SingleRender } from "./elements/SingleRender";
import { SingleTitle } from "./elements/SingleTitle";
import { Title } from "./elements/Title";
import * as DefaultFragments from "./gql/fragments";

export const DefaultComponents = {
  ArchiveCard,
  ArchiveRender,
  Button,
  ClockIcon,
  ErrorRouting,
  FolderIcon,
  Loading,
  LoadingError,
  NotFound,
  PageWidth,
  Pagination,
  PostContent,
  Seo,
  SingleRender,
  SingleTitle,
  Title,
};

export const PopulateComponents = (components = {}) => {
  if (!components) components = {};

  Object.keys(DefaultComponents).forEach((key) => {
    if (!components[key]) {
      components[key] = DefaultComponents[key];
    }
  });
};

export const PopulateFragments = (fragments = {}) => {
  if (!fragments) fragments = {};

  Object.keys(DefaultFragments).forEach((key) => {
    if (!fragments[key]) {
      fragments[key] = DefaultFragments[key];
    }
  });
};
