import { action } from "easy-peasy";

export const NotificationStore = {
  notifications: [],
  info: action((state, payload) => {
    state.notifications.push({type: "info", msg: payload})
  }),
  warn: action((state, payload) => {
    state.notifications.push({type: "warn", msg: payload})
  }),
  fail: action((state, payload) => {
    state.notifications.push({type: "fail", msg: payload})
  })
}