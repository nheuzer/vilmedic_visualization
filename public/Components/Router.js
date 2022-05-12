import HomePage from "./HomePage.js";
import RRG2Page from "./RRG2Page.js";
import RRG3Page from "./RRG3Page.js";
import ErrorPage from "./ErrorPage.js";

const routes = {
  "/": HomePage,
  "/vilmedicRRG2": RRG2Page,
  "/vilmedicRRG3": RRG3Page,
  "/error": ErrorPage,
};

let componentToRender;

const Router = () => {
  window.addEventListener("load", (e) => {
    componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      return ErrorPage(
        new Error(
          "The " + window.location.pathname + " ressource does not exist."
        )
      );
    componentToRender();
  });

  //redirection
  const onNavigate = (e) => {
    let uri;
    if (e.target.tagName === "A") {
      e.preventDefault();
      uri = e.target.dataset.uri;
    } else if (e.target.tagName === "SPAN") {
      uri = e.target.parentElement.dataset.uri;
    }
    if (uri) {
      window.history.pushState({}, uri, window.location.origin + uri);
      componentToRender = routes[uri];
      if (routes[uri]) {
        console.log("router in");
        componentToRender();
      } else {
        ErrorPage(new Error("The " + uri + " ressource does not exist"));
      }
    }
  };

  /*
  window.addEventListener("popstate", () => {
    componentToRender = routes[window.location.pathname];
    componentToRender();
  });
  */
};

const RedirectUrl = (uri, data) => {
  window.history.pushState({}, uri, window.location.origin + uri);
  componentToRender = routes[uri];
  if (routes[uri]) {
    if (!data) componentToRender();
    else componentToRender(data);
  } else {
    ErrorPage(new Error("The " + uri + " ressource does not exist"));
  }
};

export { Router, RedirectUrl };
