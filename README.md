# gum

Git User Manager - Switch between git users easily.

## Installation

```bash
# npm
npm install -g @wst7/gum

# or bun
bun add -g @wst7/gum
```

## Usage

```
gum add <name> <email>    Add a new user configuration
gum rm <name>             Remove a user configuration
gum ls                    List all configured users
gum use <name>            Set git user for current repository
gum cur                   Show current git user configuration
```

## Examples

### Add a user

```bash
gum add work work@example.com
# SUCCESS User 'work' added. Run gum use work to use it.
```

### List users

```bash
gum ls
# * work          work@example.com
#   personal      personal@other.com
```

### Switch user in a repository

```bash
gum use work
# SUCCESS Now using 'work' (work@example.com) in this repository.
```

### Show current git config

```bash
gum cur
# * work          work@example.com
```

## Configuration

`~/.gumrc` - INI format, stores all named user configurations:

```ini
[user "work"]
email=work@example.com

[user "personal"]
email=personal@other.com
```

- `~/.gitconfig` - Global git config (read as fallback)
- `./.git/config` - Local git config (modified by `gum use`)

## Development

```bash
bun install
bun run dev -- [command]
bun run typecheck
```

## Building

```bash
bun run build
```

## Testing

```bash
bun test
```

## Release

```bash
npm run release
```

## License

MIT
