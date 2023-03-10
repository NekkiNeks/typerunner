//dayjs
import dayjs from "dayjs";
import RuLocale from "dayjs/locale/ru";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);
dayjs.locale(RuLocale);

export default dayjs;
