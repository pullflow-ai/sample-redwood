import {
  command,
  aliases,
  description,
  handler,
} from './commands/storybook'

export const commands = [
  {
    command,
    aliases,
    description,
    builder,
    handler,
  },
]
