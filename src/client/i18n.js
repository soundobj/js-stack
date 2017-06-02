// from https://github.com/iam-peekay/inbox-react-intl/blob/34d30e5dc6b84c7a83e2ae39ffda15507b7a7104/src/js/index.js

import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
// import es from "react-intl/locale-data/es";
// import fr from "react-intl/locale-data/fr";
// import it from "react-intl/locale-data/it";
import locale from "locale";

// Our translated strings
import localeData from "./locale/main.json";

addLocaleData([...en/* , ...es, ...fr, ...it */]);
const supported = new locale.Locales(["en-GB"], "en-GB");

// Define user"s language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const appLocale = new locale.Locales(language).best(supported).toString();

// Try full locale, fallback to locale without region code, fallback to en
const messages = localeData[appLocale] || localeData["en-GB"];

// If we need to access the React Intl API outside of the <Component> context use intl.formatMessage({ id: "login.username" })
const intlProvider = new IntlProvider({ locale: appLocale, messages }, {});
const { intl } = intlProvider.getChildContext();

const formats = {
  dateTime: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // timeZoneName: "short",
    hour12: true,
  },
};

export { language, messages, intl, formats };