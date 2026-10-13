window.__AIKEYS_CATALOG__ = {
  "oses": [
    {
      "id": "win",
      "ru": "Windows",
      "en": "Windows"
    },
    {
      "id": "mac",
      "ru": "macOS",
      "en": "macOS"
    },
    {
      "id": "linux",
      "ru": "Linux",
      "en": "Linux"
    }
  ],
  "apps": [
    {
      "id": "claude-code",
      "ru": "Claude Code CLI",
      "en": "Claude Code CLI"
    },
    {
      "id": "claude-vscode",
      "ru": "Claude Code в VS Code",
      "en": "Claude Code in VS Code"
    },
    {
      "id": "codex",
      "ru": "Codex CLI / App",
      "en": "Codex CLI / App"
    },
    {
      "id": "cline",
      "ru": "Cline · Roo · Kilo",
      "en": "Cline · Roo · Kilo"
    },
    {
      "id": "cursor",
      "ru": "Cursor",
      "en": "Cursor"
    },
    {
      "id": "continue",
      "ru": "Continue",
      "en": "Continue"
    },
    {
      "id": "opencode",
      "ru": "OpenCode",
      "en": "OpenCode"
    },
    {
      "id": "aider",
      "ru": "aider",
      "en": "aider"
    },
    {
      "id": "claude-desktop",
      "ru": "Claude Desktop",
      "en": "Claude Desktop"
    },
    {
      "id": "chat",
      "ru": "Чат-приложения",
      "en": "Chat apps"
    },
    {
      "id": "images",
      "ru": "Картинки по API",
      "en": "Images via API"
    },
    {
      "id": "audio",
      "ru": "Речь в текст",
      "en": "Speech to text"
    },
    {
      "id": "video",
      "ru": "Видео",
      "en": "Video"
    },
    {
      "id": "n8n",
      "ru": "n8n",
      "en": "n8n"
    },
    {
      "id": "other",
      "ru": "Другое / просит OpenRouter",
      "en": "Something else / asks for OpenRouter"
    }
  ],
  "recipes": {
    "claude-code": {
      "intro": {
        "ru": "Официальная программа Anthropic для работы с кодом. Наш ключ она принимает целиком: проверено живьём, отвечает через наш шлюз.",
        "en": "Anthropic's official coding tool. It takes our key as-is: verified live, it answers through our gateway."
      },
      "steps": [
        {
          "t": {
            "ru": "Установить программу",
            "en": "Install it"
          },
          "p": {
            "win": {
              "ru": "Сначала поставьте Node.js LTS с nodejs.org (обычный установщик, всё по умолчанию). Затем откройте PowerShell (Win+X → Windows PowerShell). Дальше одна команда.",
              "en": "First install Node.js LTS from nodejs.org (regular installer, defaults are fine). Then open PowerShell (Win+X → Windows PowerShell). Then one command."
            },
            "mac": {
              "ru": "Сначала поставьте Node.js LTS с nodejs.org. Затем откройте Терминал: ⌘ + пробел → наберите «Терминал» → Enter. Дальше одна команда.",
              "en": "First install Node.js LTS from nodejs.org. Then open Terminal: ⌘ + Space → type Terminal → Enter. Then one command."
            },
            "linux": {
              "ru": "Сначала поставьте Node.js LTS (nodejs.org или пакетный менеджер). Откройте терминал. Дальше одна команда.",
              "en": "First install Node.js LTS (nodejs.org or your package manager). Open a terminal. Then one command."
            }
          },
          "code": {
            "win": "npm install -g @anthropic-ai/claude-code",
            "mac": "npm install -g @anthropic-ai/claude-code",
            "linux": "npm install -g @anthropic-ai/claude-code"
          }
        },
        {
          "t": {
            "ru": "Проверить, что установилось",
            "en": "Check the install"
          },
          "code": "claude --version",
          "p": {
            "ru": "Выводится номер версии — идём дальше. Пишет «команда не найдена» — закройте окно терминала и откройте заново.",
            "en": "A version number means you are good. “Command not found” — close the terminal window and open it again."
          }
        },
        {
          "t": {
            "ru": "Создать файл настроек",
            "en": "Create the settings file"
          },
          "p": {
            "win": {
              "ru": "Откройте PowerShell и выполните — файл создастся и откроется в блокноте.",
              "en": "In PowerShell run this — the file will be created and opened in Notepad."
            },
            "mac": {
              "ru": "Выполните в терминале — файл создастся и откроется в текстовом редакторе.",
              "en": "Run this in the terminal — the file will be created and opened in a text editor."
            },
            "linux": {
              "ru": "Выполните в терминале — файл создастся и откроется в редакторе nano.",
              "en": "Run this in the terminal — the file will be created and opened in nano."
            }
          },
          "code": {
            "win": "mkdir -Force $HOME\\.claude | Out-Null; notepad $HOME\\.claude\\settings.json",
            "mac": "mkdir -p ~/.claude \u0026\u0026 touch ~/.claude/settings.json \u0026\u0026 open -e ~/.claude/settings.json",
            "linux": "mkdir -p ~/.claude \u0026\u0026 nano ~/.claude/settings.json"
          }
        },
        {
          "t": {
            "ru": "Вставить настройки и сохранить",
            "en": "Paste the settings and save"
          },
          "p": {
            "ru": "Скопируйте всё целиком в открывшийся пустой файл и сохраните. Ключ уже подставлен.",
            "en": "Copy all of it into the empty file that just opened and save. Your key is already filled in."
          },
          "code": "{\n  \"env\": {\n    \"ANTHROPIC_BASE_URL\": \"https://api.aikeysforyou.com\",\n    \"ANTHROPIC_AUTH_TOKEN\": \"{{KEY}}\",\n    \"ANTHROPIC_DEFAULT_OPUS_MODEL\": \"claude-opus-5\",\n    \"ANTHROPIC_DEFAULT_SONNET_MODEL\": \"claude-sonnet-5\",\n    \"ANTHROPIC_DEFAULT_HAIKU_MODEL\": \"claude-haiku-4-5\",\n    \"CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK\": \"1\",\n    \"DISABLE_TELEMETRY\": \"1\",\n    \"DISABLE_ERROR_REPORTING\": \"1\",\n    \"DISABLE_NON_ESSENTIAL_MODEL_CALLS\": \"1\"\n  }\n}",
          "tip": {
            "win": {
              "ru": "Блокнот может сохранить файл как settings.json.txt. В окне сохранения выберите «Тип файла: Все файлы».",
              "en": "Notepad may save it as settings.json.txt. In the save dialog pick “Save as type: All files”."
            },
            "mac": {
              "ru": "Файл уже назван правильно — просто ⌘S и закрыть окно.",
              "en": "The file is already named correctly — just press ⌘S and close the window."
            },
            "linux": {
              "ru": "В nano сохранение — Ctrl+O, затем Enter, выход — Ctrl+X.",
              "en": "In nano press Ctrl+O then Enter to save, Ctrl+X to exit."
            }
          }
        },
        {
          "t": {
            "ru": "Запустить и проверить",
            "en": "Run it and check"
          },
          "p": {
            "ru": "Откройте терминал в папке своего проекта и наберите claude. Регистрироваться в Anthropic и входить в аккаунт не нужно — если предложит войти, пропустите. Спросите что угодно: ответ значит, что всё работает.",
            "en": "Open a terminal in your project folder and type claude. No Anthropic account or sign-in needed — skip the prompt if it appears. Ask anything: an answer means it works."
          },
          "code": "claude"
        }
      ],
      "after": [
        {
          "ru": "Сменить модель на ходу — команда /model, дальше имя модели: claude-opus-5, claude-sonnet-5, claude-haiku-5-5, claude-haiku-4-5.",
          "en": "Switch models on the fly with /model, then a model name: claude-opus-5, claude-sonnet-5, claude-haiku-5-5, claude-haiku-4-5."
        },
        {
          "ru": "Уже есть подписка Claude? Сохраните копию старого settings.json — вернуться назад можно, удалив блок env. Надпись «auth conflict» при этом нормальна: работает ключ из файла.",
          "en": "Already on a Claude subscription? Keep a copy of your old settings.json — deleting the env block puts you back. An “auth conflict” banner is normal: the file key wins."
        },
        {
          "ru": "Размышлений (thinking) у Claude через нас нет, кэша тоже — счётчик /context показывает приблизительно. Всё остальное работает как обычно.",
          "en": "Claude's extended thinking and prompt cache are not available through us, so the /context meter is approximate. Everything else behaves normally."
        }
      ]
    },
    "claude-vscode": {
      "intro": {
        "ru": "То же самое, что в терминале, но внутри редактора. Настройка общая — один файл на обе версии.",
        "en": "The same thing as the terminal version, but inside the editor. One shared settings file for both."
      },
      "steps": [
        {
          "t": {
            "ru": "Поставить расширение",
            "en": "Install the extension"
          },
          "p": {
            "ru": "В VS Code откройте вкладку расширений и поставьте официальное расширение Claude Code.",
            "en": "In VS Code open the extensions tab and install the official Claude Code extension."
          }
        },
        {
          "t": {
            "ru": "Положить файл настроек",
            "en": "Drop in the settings file"
          },
          "p": {
            "win": {
              "ru": "Своих настроек у расширения нет — оно читает тот же файл, что и терминальная версия: C:\\Users\\ВАШЕ_ИМЯ\\.claude\\settings.json. Создайте его и вставьте это:",
              "en": "The extension has no settings of its own — it reads the same file as the terminal version: C:\\Users\\YOUR_NAME\\.claude\\settings.json. Create it and paste this:"
            },
            "mac": {
              "ru": "Своих настроек у расширения нет — оно читает тот же файл, что и терминальная версия: ~/.claude/settings.json. Создайте его и вставьте это:",
              "en": "The extension has no settings of its own — it reads the same file as the terminal version: ~/.claude/settings.json. Create it and paste this:"
            },
            "linux": {
              "ru": "Своих настроек у расширения нет — оно читает тот же файл, что и терминальная версия: ~/.claude/settings.json. Создайте его и вставьте это:",
              "en": "The extension has no settings of its own — it reads the same file as the terminal version: ~/.claude/settings.json. Create it and paste this:"
            }
          },
          "code": "{\n  \"env\": {\n    \"ANTHROPIC_BASE_URL\": \"https://api.aikeysforyou.com\",\n    \"ANTHROPIC_AUTH_TOKEN\": \"{{KEY}}\",\n    \"ANTHROPIC_DEFAULT_OPUS_MODEL\": \"claude-opus-5\",\n    \"ANTHROPIC_DEFAULT_SONNET_MODEL\": \"claude-sonnet-5\",\n    \"ANTHROPIC_DEFAULT_HAIKU_MODEL\": \"claude-haiku-4-5\",\n    \"CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK\": \"1\",\n    \"DISABLE_TELEMETRY\": \"1\",\n    \"DISABLE_ERROR_REPORTING\": \"1\",\n    \"DISABLE_NON_ESSENTIAL_MODEL_CALLS\": \"1\"\n  }\n}"
        },
        {
          "t": {
            "ru": "Перезапустить VS Code",
            "en": "Restart VS Code"
          },
          "p": {
            "ru": "Полностью закройте и откройте заново — расширение читает файл при старте.",
            "en": "Close it completely and open again — the extension reads the file at startup."
          }
        },
        {
          "t": {
            "ru": "Открыть панель Claude",
            "en": "Open the Claude panel"
          },
          "p": {
            "ru": "Задайте любой вопрос. Просит войти в аккаунт — закройте окно входа, ключ уже подставлен из файла.",
            "en": "Ask anything. If it asks you to sign in, close that window — the key already comes from the file."
          }
        }
      ],
      "after": [
        {
          "ru": "Сменить модель на ходу — команда /model, дальше имя модели: claude-opus-5, claude-sonnet-5, claude-haiku-5-5, claude-haiku-4-5.",
          "en": "Switch models on the fly with /model, then a model name: claude-opus-5, claude-sonnet-5, claude-haiku-5-5, claude-haiku-4-5."
        },
        {
          "ru": "Уже есть подписка Claude? Сохраните копию старого settings.json — вернуться назад можно, удалив блок env. Надпись «auth conflict» при этом нормальна: работает ключ из файла.",
          "en": "Already on a Claude subscription? Keep a copy of your old settings.json — deleting the env block puts you back. An “auth conflict” banner is normal: the file key wins."
        },
        {
          "ru": "Размышлений (thinking) у Claude через нас нет, кэша тоже — счётчик /context показывает приблизительно. Всё остальное работает как обычно.",
          "en": "Claude's extended thinking and prompt cache are not available through us, so the /context meter is approximate. Everything else behaves normally."
        }
      ]
    },
    "codex": {
      "intro": {
        "ru": "Терминальный агент OpenAI и его настольное приложение. Наш ключ принимают через свой файл настроек — по протоколу Responses.",
        "en": "OpenAI's terminal agent and its desktop app. They take our key through their own config file — over the Responses protocol."
      },
      "steps": [
        {
          "t": {
            "ru": "Установить",
            "en": "Install it"
          },
          "p": {
            "win": {
              "ru": "Сначала поставьте Node.js LTS с nodejs.org (обычный установщик, всё по умолчанию). Затем откройте PowerShell (Win+X → Windows PowerShell). Дальше одна команда.",
              "en": "First install Node.js LTS from nodejs.org (regular installer, defaults are fine). Then open PowerShell (Win+X → Windows PowerShell). Then one command."
            },
            "mac": {
              "ru": "Сначала поставьте Node.js LTS с nodejs.org. Затем откройте Терминал: ⌘ + пробел → «Терминал» → Enter. Дальше одна команда.",
              "en": "First install Node.js LTS from nodejs.org. Then open Terminal: ⌘ + Space → Terminal → Enter. Then one command."
            },
            "linux": {
              "ru": "Сначала поставьте Node.js LTS (nodejs.org или пакетный менеджер). Откройте терминал. Дальше одна команда.",
              "en": "First install Node.js LTS (nodejs.org or your package manager). Open a terminal. Then one command."
            }
          },
          "code": "npm install -g @openai/codex"
        },
        {
          "t": {
            "ru": "Открыть файл настроек",
            "en": "Open the config file"
          },
          "p": {
            "win": {
              "ru": "Файл лежит в %USERPROFILE%\\.codex\\config.toml. Команда создаст папку и откроет файл в блокноте.",
              "en": "The file is %USERPROFILE%\\.codex\\config.toml. The command creates the folder and opens the file in Notepad."
            },
            "mac": {
              "ru": "Файл лежит в ~/.codex/config.toml. Команда создаст папку и откроет файл в текстовом редакторе.",
              "en": "The file is ~/.codex/config.toml. The command creates the folder and opens the file in a text editor."
            },
            "linux": {
              "ru": "Файл лежит в ~/.codex/config.toml. Команда создаст папку и откроет файл в nano.",
              "en": "The file is ~/.codex/config.toml. The command creates the folder and opens the file in nano."
            }
          },
          "code": {
            "win": "mkdir -Force $HOME\\.codex | Out-Null; notepad $HOME\\.codex\\config.toml",
            "mac": "mkdir -p ~/.codex \u0026\u0026 touch ~/.codex/config.toml \u0026\u0026 open -e ~/.codex/config.toml",
            "linux": "mkdir -p ~/.codex \u0026\u0026 nano ~/.codex/config.toml"
          }
        },
        {
          "t": {
            "ru": "Вставить блок и сохранить",
            "en": "Paste the block and save"
          },
          "p": {
            "ru": "Вставьте в начало файла. Ключ уже вписан в блок — переменные окружения не нужны. Если файл уже был и в нём есть строки model_provider или model — замените их этими.",
            "en": "Paste it at the top of the file. Your key is already inside the block — no environment variables needed. If the file already exists and has model_provider or model lines — replace them with these."
          },
          "code": "model_provider = \"aikeys\"\nmodel = \"gpt-6-astra\"\n\n[model_providers.aikeys]\nname = \"Aikeys\"\nbase_url = \"https://api.aikeysforyou.com/v1\"\nwire_api = \"responses\"\nexperimental_bearer_token = \"{{KEY}}\"",
          "tip": {
            "win": {
              "ru": "Блокнот может сохранить файл как config.toml.txt. В окне сохранения выберите «Тип файла: Все файлы».",
              "en": "Notepad may save it as config.toml.txt. In the save dialog pick “Save as type: All files”."
            },
            "mac": {
              "ru": "Файл уже назван правильно — просто ⌘S и закрыть окно.",
              "en": "The file is already named correctly — just press ⌘S and close the window."
            },
            "linux": {
              "ru": "В nano сохранение — Ctrl+O, затем Enter, выход — Ctrl+X.",
              "en": "In nano press Ctrl+O then Enter to save, Ctrl+X to exit."
            }
          }
        },
        {
          "t": {
            "ru": "Если раньше входили через ChatGPT",
            "en": "If you signed in with ChatGPT before"
          },
          "p": {
            "ru": "Старый вход перебивает ключ. Переименуйте файл auth.json — назад вернуть можно так же, переименовав обратно.",
            "en": "The old sign-in overrides the key. Rename auth.json — you can always rename it back."
          },
          "code": {
            "win": "ren $HOME\\.codex\\auth.json auth.json.bak",
            "mac": "mv ~/.codex/auth.json ~/.codex/auth.json.bak",
            "linux": "mv ~/.codex/auth.json ~/.codex/auth.json.bak"
          }
        },
        {
          "t": {
            "ru": "Запустить и проверить",
            "en": "Run it and check"
          },
          "p": {
            "ru": "Откройте терминал в папке проекта и наберите codex. Спросите что угодно: ответ значит, что всё работает. Модель меняется командой /model или строкой model в config.toml: gpt-6-astra, gpt-5.6-sol, gpt-5.5.",
            "en": "Open a terminal in your project folder and type codex. Ask anything: an answer means it works. Switch models with /model or the model line in config.toml: gpt-6-astra, gpt-5.6-sol, gpt-5.5."
          },
          "code": "codex"
        }
      ],
      "after": [
        {
          "ru": "Подписка ChatGPT не нужна: Codex работает по ключу.",
          "en": "No ChatGPT subscription needed: Codex runs on the key."
        },
        {
          "ru": "Приложение Codex читает тот же config.toml — настроив терминал, настроили и его.",
          "en": "The Codex app reads the same config.toml — set up the terminal and the app is set up too."
        }
      ]
    },
    "cline": {
      "intro": {
        "ru": "Самые популярные ИИ-агенты для VS Code. Настройка у всех трёх почти одинаковая.",
        "en": "The most popular AI agents for VS Code. All three are set up almost identically."
      },
      "steps": [
        {
          "t": {
            "ru": "Поставить расширение",
            "en": "Install the extension"
          },
          "p": {
            "ru": "В VS Code откройте вкладку расширений и поставьте Cline, Roo Code или Kilo Code — настройка у всех трёх одинаковая.",
            "en": "In VS Code open the extensions tab and install Cline, Roo Code or Kilo Code — all three are set up the same way."
          }
        },
        {
          "t": {
            "ru": "Выбрать тип провайдера",
            "en": "Pick the provider type"
          },
          "p": {
            "ru": "В настройках расширения найдите список провайдеров и выберите OpenAI Compatible. Не «OpenAI», не «Anthropic», не «DeepSeek», не «OpenRouter» (даже если купили ключ DeepSeek) — нужен именно тот пункт, где можно вписать свой адрес.",
            "en": "In the extension settings find the provider list and choose OpenAI Compatible. Not “OpenAI”, not “Anthropic”, not “DeepSeek”, not “OpenRouter” (even for a DeepSeek key) — you need the one that lets you type your own address."
          }
        },
        {
          "t": {
            "ru": "Вписать три поля",
            "en": "Fill in three fields"
          },
          "fields": [
            [
              "Base URL",
              "https://api.aikeysforyou.com/v1"
            ],
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Model ID",
              "claude-opus-5"
            ]
          ],
          "p": {
            "ru": "Модель берите из списка на главной странице, раздел «Модели»; универсальный выбор — claude-opus-5. В Roo Code и Kilo Code список подтянется сам, в Cline имя вписывается руками.",
            "en": "Take a model from the Models section on the main page; claude-opus-5 is the safe default. Roo Code and Kilo Code load the list themselves; in Cline you type the name in."
          }
        },
        {
          "t": {
            "ru": "Только для Cline: поправить настройки модели",
            "en": "Cline only: fix the model settings"
          },
          "p": {
            "ru": "Этот шаг нужен именно в Cline — в Roo Code и Kilo Code экран другой, и если таких полей нет, шаг пропускайте. Разверните Model Configuration и выставьте эти значения. Без этого первый же запрос отобьётся ошибкой pre_consume_token_quota_failed: Cline резервирует под ответ столько токенов, сколько указано в Max Output Tokens, умноженных на ставку модели.",
            "en": "This step is for Cline only — Roo Code and Kilo Code have a different screen; if these fields are missing, skip it. Expand Model Configuration and set these values. Without it the very first request fails with pre_consume_token_quota_failed: Cline reserves as many tokens as Max Output Tokens says, multiplied by the model rate."
          },
          "fields": [
            [
              "Context Window Size",
              "256000"
            ],
            [
              "Max Output Tokens",
              "8192"
            ],
            [
              "Input Price / 1M",
              "0"
            ],
            [
              "Output Price / 1M",
              "0"
            ],
            [
              "Reasoning Effort",
              "Low"
            ]
          ],
          "tip": {
            "ru": "Главный виновник — Max Output Tokens. При значении 1000000 расширение просит зарезервировать миллион токенов ответа: на ключе с миллионом единиц не хватит даже на один запрос. 8192 хватает на любой ответ с кодом. Цены оставьте нулями — точный расход в рублях виден в кабинете.",
            "en": "The culprit is Max Output Tokens. At 1000000 the extension asks to reserve a million output tokens: a one-million key will not cover a single request. 8192 is plenty for any code answer. Leave the prices at zero — the real spend in roubles is in your dashboard."
          }
        },
        {
          "t": {
            "ru": "Проверить",
            "en": "Check"
          },
          "p": {
            "ru": "Напишите расширению любой вопрос. Если в списке моделей появились gpt-4o и прочее, чего у нас нет, — адрес или ключ введены неверно, и расширение показывает свой запасной список.",
            "en": "Ask the extension anything. If the model list shows gpt-4o and other things we do not sell, the address or key is wrong and the extension is showing its fallback list."
          }
        }
      ],
      "after": [
        {
          "ru": "Галку «поддерживает изображения» включайте для gpt-6-astra и gemini-3.1-pro — у них картинки проходят. У Claude сейчас нет.",
          "en": "Enable the “supports images” checkbox for gpt-6-astra and gemini-3.1-pro — images go through on those. Not on Claude right now."
        },
        {
          "ru": "Модель представляется словом «Cline» — так ей велел сам Cline своим системным промптом. Спросите её вне агента, и она назовёт настоящее имя.",
          "en": "The model introduces itself as “Cline” because Cline's own system prompt tells it to. Ask it outside the agent and it gives its real name."
        }
      ]
    },
    "cursor": {
      "intro": {
        "ru": "Работает, но с оговоркой — прочитайте её сразу под шагами.",
        "en": "Works, with one caveat — read it right below the steps."
      },
      "steps": [
        {
          "t": {
            "ru": "Открыть настройки моделей",
            "en": "Open the model settings"
          },
          "p": {
            "mac": {
              "ru": "Cursor → Settings (⌘,) → раздел Models.",
              "en": "Cursor → Settings (⌘,) → Models section."
            },
            "win": {
              "ru": "Cursor → Settings (Ctrl+,) → раздел Models.",
              "en": "Cursor → Settings (Ctrl+,) → Models section."
            },
            "linux": {
              "ru": "Cursor → Settings (Ctrl+,) → раздел Models.",
              "en": "Cursor → Settings (Ctrl+,) → Models section."
            }
          }
        },
        {
          "t": {
            "ru": "Вставить ключ и адрес",
            "en": "Paste the key and the address"
          },
          "p": {
            "ru": "Найдите блок ключа OpenAI, вставьте ключ, включите переключатель адреса (Override OpenAI Base URL) и впишите наш адрес. Если Verify отвечает 404, уберите хвост /v1 из адреса: некоторые версии Cursor добавляют его сами.",
            "en": "Find the OpenAI key block, paste the key, turn on Override OpenAI Base URL and enter our address. If Verify returns 404, remove the trailing /v1 from the address: some Cursor versions append it themselves."
          },
          "fields": [
            [
              "OpenAI API Key",
              "{{KEY}}"
            ],
            [
              "Override OpenAI Base URL",
              "https://api.aikeysforyou.com/v1"
            ]
          ]
        },
        {
          "t": {
            "ru": "Добавить модель и сохранить",
            "en": "Add a model and save"
          },
          "p": {
            "ru": "Добавьте модель по имени — например gpt-5.6-terra или deepseek-v4-pro — и нажмите сохранить или Verify. Модели Claude Cursor с чужим ключом не пускает — это ограничение Cursor; для Claude берите Cline, Claude Code или OpenCode с тем же ключом.",
            "en": "Add a model by its exact name — gpt-5.6-terra or deepseek-v4-pro, for instance — then hit save or Verify. Cursor blocks Claude models on a third-party key — that is Cursor's own limit; for Claude use Cline, Claude Code or OpenCode with the same key."
          },
          "code": "claude-opus-5"
        }
      ],
      "after": [
        {
          "ru": "Честно и сразу: Cursor принимает чужой ключ только для чата. Автодополнение по Tab и часть агентских функций всегда идут через серверы самого Cursor — это его ограничение, не наше, и написано в его же документации.",
          "en": "Straight talk: Cursor accepts an external key for chat only. Tab completion and some agent features always go through Cursor's own servers — their limitation, not ours, and it is stated in their docs."
        },
        {
          "ru": "Пишет «Named models unavailable — Free plans can only use Auto»? Это бесплатный тариф Cursor: он не пускает выбранные модели даже со своим ключом, до нас запрос не доходит. Обход внутри того же Cursor — расширение Cline или Roo Code (Ctrl+Shift+X), провайдер OpenAI Compatible, наш адрес и ключ, модель вписать вручную — по соседнему рецепту «Cline · Roo · Kilo».",
          "en": "Seeing “Named models unavailable — Free plans can only use Auto”? That is Cursor's free plan: it blocks picked models even with your own key, the request never reaches us. Workaround inside the same Cursor — the Cline or Roo Code extension (Ctrl+Shift+X), provider OpenAI Compatible, our address and key, type the model name by hand — see the “Cline · Roo · Kilo” recipe."
        },
        {
          "ru": "Переключателя адреса в вашей версии нет? Поставьте прямо в Cursor расширение Cline или Roo Code и настройте по соседнему рецепту: Cursor — форк VS Code, расширения там работают.",
          "en": "No address toggle in your version? Install the Cline or Roo Code extension right inside Cursor and follow that recipe: Cursor is a VS Code fork, extensions work there."
        },
        {
          "ru": "Запросы Cursor идут через его серверы, то есть ключ уезжает к ним. Не устраивает — тот же обход через Cline.",
          "en": "Cursor routes requests through its own backend, so your key travels there. Not comfortable with that? Same workaround through Cline."
        }
      ]
    },
    "continue": {
      "intro": {
        "ru": "Расширение для VS Code и JetBrains. Настраивается одним файлом.",
        "en": "An extension for VS Code and JetBrains. One config file."
      },
      "steps": [
        {
          "t": {
            "ru": "Открыть файл настроек Continue",
            "en": "Open the Continue config"
          },
          "p": {
            "win": {
              "ru": "Файл лежит в C:\\Users\\ВАШЕ_ИМЯ\\.continue\\config.yaml",
              "en": "The file lives at C:\\Users\\YOUR_NAME\\.continue\\config.yaml"
            },
            "mac": {
              "ru": "Файл лежит в ~/.continue/config.yaml",
              "en": "The file lives at ~/.continue/config.yaml"
            },
            "linux": {
              "ru": "Файл лежит в ~/.continue/config.yaml",
              "en": "The file lives at ~/.continue/config.yaml"
            }
          }
        },
        {
          "t": {
            "ru": "Добавить наши модели",
            "en": "Add our models"
          },
          "p": {
            "ru": "Впишите этот блок в раздел models. Ключ уже подставлен.",
            "en": "Put this block into the models section. Your key is already filled in."
          },
          "code": "models:\n  - name: Aikeys Opus 5\n    provider: openai\n    model: claude-opus-5\n    apiBase: https://api.aikeysforyou.com/v1\n    apiKey: {{KEY}}\n  - name: Aikeys Haiku\n    provider: openai\n    model: claude-haiku-4-5\n    apiBase: https://api.aikeysforyou.com/v1\n    apiKey: {{KEY}}"
        },
        {
          "t": {
            "ru": "Перезапустить редактор",
            "en": "Restart the editor"
          },
          "p": {
            "ru": "Continue перечитывает файл при старте. После перезапуска модели появятся в его списке.",
            "en": "Continue reads the file at startup. After a restart the models show up in its picker."
          }
        }
      ],
      "after": []
    },
    "opencode": {
      "intro": {
        "ru": "Агент для кода в терминале. Берёт наш ключ как OpenAI-совместимого провайдера, проверено живьём.",
        "en": "A terminal coding agent. It takes our key as an OpenAI-compatible provider, verified live."
      },
      "steps": [
        {
          "t": {
            "ru": "Установить",
            "en": "Install it"
          },
          "p": {
            "ru": "Откройте терминал: на Windows PowerShell (Win+X → Windows PowerShell), на маке Терминал (⌘ + пробел). Команда не найдена — откройте окно терминала заново.",
            "en": "Open a terminal: PowerShell on Windows (Win+X → Windows PowerShell), Terminal on a Mac (⌘ + Space). Not found — reopen the terminal window."
          },
          "code": {
            "win": "npm install -g opencode-ai",
            "mac": "curl -fsSL https://opencode.ai/install | bash",
            "linux": "curl -fsSL https://opencode.ai/install | bash"
          },
          "tip": {
            "win": {
              "ru": "«npm не распознано» — нет Node.js: поставьте LTS с nodejs.org и откройте PowerShell заново. Без Node.js: в PowerShell от администратора wsl --install, перезагрузка, дальше инструкция для Linux (переключатель вверху).",
              "en": "“npm is not recognized” — no Node.js: install the LTS from nodejs.org and reopen PowerShell. Without Node.js: wsl --install in an admin PowerShell, reboot, then the Linux steps (OS switch above)."
            }
          }
        },
        {
          "t": {
            "ru": "Создать файл настроек",
            "en": "Create the settings file"
          },
          "p": {
            "ru": "Файл настроек — .config/opencode/opencode.json в домашней папке (на Windows .config, не AppData). Папку с точкой Проводник не создаёт — её сделает команда из того же окна.",
            "en": "The settings file is .config/opencode/opencode.json in your home folder (on Windows .config, not AppData). Explorer will not make a dot-folder — the command does, in the same window."
          },
          "code": {
            "win": "$d=\"$HOME\\.config\\opencode\"; mkdir -Force $d | Out-Null\nni -ItemType File $d\\opencode.json -ea 0 | Out-Null\nnotepad $d\\opencode.json",
            "mac": "mkdir -p ~/.config/opencode \u0026\u0026 touch ~/.config/opencode/opencode.json\nopen -e ~/.config/opencode/opencode.json",
            "linux": "mkdir -p ~/.config/opencode \u0026\u0026 nano ~/.config/opencode/opencode.json"
          }
        },
        {
          "t": {
            "ru": "Вставить настройки",
            "en": "Paste the settings"
          },
          "p": {
            "ru": "Сначала впишите свой ключ в поле «Ваш ключ» вверху — он подставится в блок сам. Потом вставьте блок в открывшийся файл и сохраните: Ctrl+S, на маке ⌘S, в nano — Ctrl+O, Enter, Ctrl+X. Имя aikeys не меняйте.",
            "en": "First put your key into the “Your key” field above — it fills the block in for you. Then paste the block into the open file and save: Ctrl+S, ⌘S on a Mac, Ctrl+O, Enter, Ctrl+X in nano. Keep the id aikeys."
          },
          "code": "{\n  \"provider\": {\n    \"aikeys\": {\n      \"npm\": \"@ai-sdk/openai-compatible\",\n      \"name\": \"Aikeys\",\n      \"options\": { \"baseURL\": \"https://api.aikeysforyou.com/v1\", \"apiKey\": \"{{KEY}}\" },\n      \"models\": {\n        \"claude-haiku-4-5\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"claude-opus-5\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"claude-sonnet-5\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"claude-fable-5\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gpt-5.6-sol\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gpt-6-astra\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gpt-6-sol\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gpt-6-luna\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gpt-5.6-terra\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } },\n        \"gemini-3.1-pro\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 1000000, \"output\": 8192 } },\n        \"gemini-3.7-flash\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 1000000, \"output\": 8192 } },\n        \"gemini-3.8-flash\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 1000000, \"output\": 8192 } },\n        \"deepseek-v4-pro\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 128000, \"output\": 8192 } },\n        \"gpt-5.6-luna\": { \"attachment\": true, \"modalities\": { \"input\": [\"text\", \"image\"], \"output\": [\"text\"] }, \"limit\": { \"context\": 200000, \"output\": 8192 } }\n      }\n    }\n  }\n}",
          "tip": {
            "ru": "Видите в блоке sk-ВАШ_КЛЮЧ — ключ ещё не вписан вверху. Файл не пустой — OpenCode уже настроен: сохраните копию и допишите только блок provider, два объекта подряд сломают конфиг. Нужна другая модель — допишите такой же строкой, имена в разделе «Модели» на tokenwave.ru. Значение output выше 8192 не ставьте: шлюз резервирует ответ заранее, и на остатке пакета это даёт отказ.",
            "en": "If the block shows sk-YOUR_KEY, the key is not entered above yet. File not empty — OpenCode is already set up: keep a copy and add only the provider block; two objects in a row break it. Need another model — add it as one more line, names are under Models on tokenwave.ru. Do not raise output above 8192: the gateway reserves the answer up front, and near the end of a package that turns into a refusal."
          }
        },
        {
          "t": {
            "ru": "Проверить и работать",
            "en": "Check it and go"
          },
          "p": {
            "ru": "Закройте редактор и выполните это в терминале: ответ модели значит, что связь есть (после -m — любая модель из файла). Дальше в папке проекта запускайте opencode. В /models берите только группу Aikeys: встроенные DeepSeek, OpenAI и Anthropic ходят на серверы своих компаний, наш ключ там всегда «невалиден» — даже если вы купили пакет DeepSeek.",
            "en": "Close the editor and run this in the terminal: a model reply means the link works (after -m goes any model from your file). Then run opencode in your project folder. In /models pick the Aikeys group only: the built-in DeepSeek, OpenAI and Anthropic call their own companies' servers, so our key is always “invalid” there — even if you bought a DeepSeek package."
          },
          "code": "opencode run -m aikeys/claude-haiku-4-5 \"reply with one word: ok\"",
          "tip": {
            "ru": "«Неизвестный провайдер или модель» или нет группы Aikeys в /models — OpenCode не прочитал файл: имя должно быть ровно opencode.json (Windows: dir $HOME\\.config\\opencode, без .txt), в JSON — без лишней запятой; потом перезапустите. Список моделей он не подтягивает: в /models только ваши. «Invalid token» или 401 — ключ не ваш или уже перенесён: впишите рабочий вверху и скопируйте блок заново.",
            "en": "“Unknown provider or model”, or no Aikeys group in /models — OpenCode did not read the file: the name must be exactly opencode.json (Windows: dir $HOME\\.config\\opencode, no .txt) and the JSON must hold no stray comma; then restart it. It fetches no model list: /models shows only yours. “Invalid token” or 401 — the key is not yours or was already transferred: enter a working one above and copy the block again."
          }
        }
      ],
      "after": [
        {
          "ru": "OpenCode тратит больше, чем кажется: один короткий вопрос — четыре обращения и 7392 токена. Множитель расхода у моделей разный: gpt-5.6-luna ×1,3, deepseek-v4-pro ×1,4, claude-haiku-4-5 ×1,4, claude-opus-5 ×4 — на Opus тот же вопрос снимает в разы больше.",
          "en": "OpenCode spends more than it looks: one short question meant four calls and 7392 tokens. Models burn at different rates: gpt-5.6-luna ×1.3, deepseek-v4-pro ×1.4, claude-haiku-4-5 ×1.4, claude-opus-5 ×4 — on Opus the same question eats several times more."
        },
        {
          "ru": "Имена моделей и множители — на tokenwave.ru, раздел «Модели». Остаток и расход — в кабинете panel.tokenwave.ru. Размышлений (thinking) и кэша промптов у Claude через нас нет.",
          "en": "Model names and multipliers: tokenwave.ru, Models. Balance and spend: panel.tokenwave.ru. Claude's extended thinking and prompt cache are not available through us."
        }
      ]
    },
    "aider": {
      "intro": {
        "ru": "Агент для терминала. Ставится питоном, ключ передаётся переменными окружения.",
        "en": "A terminal agent. Installed via Python, the key goes in as environment variables."
      },
      "steps": [
        {
          "t": {
            "ru": "Установить aider",
            "en": "Install aider"
          },
          "code": {
            "win": "python -m pip install aider-install \u0026\u0026 aider-install",
            "mac": "python3 -m pip install aider-install \u0026\u0026 aider-install",
            "linux": "python3 -m pip install aider-install \u0026\u0026 aider-install"
          }
        },
        {
          "t": {
            "ru": "Запустить с нашим ключом",
            "en": "Run it with our key"
          },
          "p": {
            "win": {
              "ru": "В PowerShell переменные задаются так — вставьте обе строки и команду запуска.",
              "en": "In PowerShell variables are set like this — paste both lines and the run command."
            },
            "mac": {
              "ru": "Одной строкой прямо перед командой запуска.",
              "en": "One line right before the run command."
            },
            "linux": {
              "ru": "Одной строкой прямо перед командой запуска.",
              "en": "One line right before the run command."
            }
          },
          "code": {
            "win": "$env:OPENAI_API_BASE=\"https://api.aikeysforyou.com/v1\"\n$env:OPENAI_API_KEY=\"{{KEY}}\"\naider --model openai/claude-opus-5",
            "mac": "OPENAI_API_BASE=https://api.aikeysforyou.com/v1 \\\nOPENAI_API_KEY={{KEY}} \\\naider --model openai/claude-opus-5",
            "linux": "OPENAI_API_BASE=https://api.aikeysforyou.com/v1 \\\nOPENAI_API_KEY={{KEY}} \\\naider --model openai/claude-opus-5"
          }
        }
      ],
      "after": []
    },
    "claude-desktop": {
      "intro": {
        "ru": "Настольное приложение Anthropic. С включённым режимом разработчика принимает сторонний адрес и наш ключ.",
        "en": "Anthropic's desktop app. With Developer Mode on it accepts a third-party address and our key."
      },
      "steps": [
        {
          "t": {
            "ru": "Включить режим разработчика",
            "en": "Turn on Developer Mode"
          },
          "p": {
            "ru": "Откройте меню приложения (Windows — ≡ слева вверху, Mac — строка меню) → Help → Troubleshooting → Enable Developer Mode. Приложение перезапустится.",
            "en": "Open the app menu (Windows — ≡ at the top left, Mac — the menu bar) → Help → Troubleshooting → Enable Developer Mode. The app will restart."
          }
        },
        {
          "t": {
            "ru": "Открыть сторонний вывод",
            "en": "Open third-party inference"
          },
          "p": {
            "ru": "В том же меню появится Developer → нажмите Configure Third-Party Inference и вписывайте три поля. Адрес — без /v1 на конце.",
            "en": "In the same menu open Developer → click Configure Third-Party Inference and fill in three fields. The address has no /v1 at the end."
          },
          "fields": [
            [
              "Base URL",
              "https://api.aikeysforyou.com"
            ],
            [
              "API key",
              "{{KEY}}"
            ],
            [
              "Model",
              "claude-opus-5"
            ]
          ]
        },
        {
          "t": {
            "ru": "Проверить",
            "en": "Check"
          },
          "p": {
            "ru": "Сохраните и задайте любой вопрос. Ответ значит, что всё работает. Вместо claude-opus-5 подойдёт claude-sonnet-5 — дешевле на рутине.",
            "en": "Save and ask anything. An answer means it works. claude-sonnet-5 works too instead of claude-opus-5 — cheaper for routine tasks."
          }
        }
      ],
      "after": [
        {
          "ru": "Подписка Anthropic не нужна — приложение работает по ключу.",
          "en": "No Anthropic subscription needed — the app runs on the key."
        },
        {
          "ru": "Размышлений (thinking) через нас нет: включите — ответ придёт без них.",
          "en": "Extended thinking is not available through us: turn it on and the answer arrives without it."
        }
      ]
    },
    "chat": {
      "intro": {
        "ru": "Обычные чаты с ИИ — без агентов и работы с файлами. Самый дешёвый способ расходовать пакет.",
        "en": "Plain AI chats — no agents, no file editing. The cheapest way to spend your pack."
      },
      "steps": [
        {
          "t": {
            "ru": "Выбрать провайдера",
            "en": "Pick the provider"
          },
          "p": {
            "ru": "Chatbox, LibreChat, Open WebUI, Jan, LobeChat и почти любое другое приложение-чат: в настройках выберите OpenAI или «OpenAI-совместимый».",
            "en": "Chatbox, LibreChat, Open WebUI, Jan, LobeChat and almost any other chat app: in settings choose OpenAI or “OpenAI compatible”."
          }
        },
        {
          "t": {
            "ru": "Вписать адрес и ключ",
            "en": "Enter the address and the key"
          },
          "fields": [
            [
              "API Host / Base URL",
              "https://api.aikeysforyou.com/v1"
            ],
            [
              "API Key",
              "{{KEY}}"
            ]
          ]
        },
        {
          "t": {
            "ru": "Выбрать модель",
            "en": "Choose a model"
          },
          "p": {
            "ru": "Список моделей приложение подтянет само. Если просит вписать руками — впишите claude-opus-5.",
            "en": "The app will load the model list itself. If it wants a manual entry, type claude-opus-5."
          }
        }
      ],
      "after": []
    },
    "other": {
      "intro": {
        "ru": "Общий рецепт для любой программы, которой можно указать свой адрес.",
        "en": "The generic recipe for any app that lets you point it at your own endpoint."
      },
      "steps": [
        {
          "t": {
            "ru": "Ищите пункт «OpenAI Compatible» или «Custom»",
            "en": "Look for “OpenAI Compatible” or “Custom”"
          },
          "p": {
            "ru": "Почти любая программа с ИИ умеет работать с чужим адресом. Нужен тот пункт настроек, где можно вписать свой Base URL — если такого поля нет, программа с нами не подружится.",
            "en": "Almost every AI app can talk to a custom endpoint. You need the settings entry that lets you type your own Base URL — if there is no such field, the app will not work with us."
          }
        },
        {
          "t": {
            "ru": "Вписать три параметра",
            "en": "Enter the three settings"
          },
          "fields": [
            [
              "Base URL",
              "https://api.aikeysforyou.com/v1"
            ],
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Model",
              "claude-opus-5"
            ]
          ],
          "p": {
            "ru": "Если программа ругается на адрес — попробуйте тот же адрес без /v1 на конце. Это самая частая причина ошибки 404.",
            "en": "If the app complains about the address, try the same one without /v1 at the end. That is the most common cause of a 404."
          }
        },
        {
          "t": {
            "ru": "Просит именно OpenRouter?",
            "en": "Asks specifically for OpenRouter?"
          },
          "p": {
            "ru": "Если адрес OpenRouter можно поменять — впишите наш, и всё заработает. Если он зашит намертво и меняется только ключ — не выйдет: мы свой шлюз, а не OpenRouter.",
            "en": "If the OpenRouter address is editable, put ours in and it will work. If it is hard-wired and only the key can change, it will not: we are our own gateway, not OpenRouter."
          },
          "tip": {
            "ru": "Имена в стиле OpenRouter — anthropic/claude-opus-5, openai/gpt-5.6-sol — у нас не работают. Вписывайте имя ровно как в разделе «Модели».",
            "en": "OpenRouter-style names like anthropic/claude-opus-5 or openai/gpt-5.6-sol do not work here. Type the name exactly as shown in the Models section."
          }
        }
      ],
      "after": []
    },
    "images": {
      "intro": {
        "ru": "Тот же ключ, тот же адрес. Одна картинка — фиксированное число токенов, зависит от модели и качества; ответ приходит за 20–120 секунд.",
        "en": "Same key, same address. One image costs a fixed number of tokens depending on the model and quality; the reply takes 20–120 seconds."
      },
      "steps": [
        {
          "t": {
            "ru": "Куда и с чем",
            "en": "Where and what"
          },
          "fields": [
            [
              "Endpoint",
              "https://api.aikeysforyou.com/v1/images/generations"
            ],
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Model",
              "gpt-image-2"
            ]
          ],
          "p": {
            "ru": "Формат — как у OpenAI Images: model, prompt, quality (low / medium / high), size, n (1, 2 или 4), response_format b64_json. Если quality не указать, будет low.",
            "en": "The format is the OpenAI Images one: model, prompt, quality (low / medium / high), size, n (1, 2 or 4), response_format b64_json. Without quality you get low."
          }
        },
        {
          "t": {
            "ru": "Пример запроса",
            "en": "Example request"
          },
          "p": {
            "win": {
              "ru": "В PowerShell проще через Python (python.org): сохраните код как gen.py и запустите python gen.py.",
              "en": "On PowerShell it is easier via Python (python.org): save the code as gen.py and run python gen.py."
            },
            "mac": {
              "ru": "В Терминале. Картинка сохранится в image.png в текущей папке.",
              "en": "In Terminal. The image is saved as image.png in the current folder."
            },
            "linux": {
              "ru": "В терминале. Картинка сохранится в image.png в текущей папке.",
              "en": "In the terminal. The image is saved as image.png in the current folder."
            }
          },
          "code": {
            "win": "import base64, json, urllib.request\n\nreq = urllib.request.Request(\n    \"https://api.aikeysforyou.com/v1/images/generations\",\n    data=json.dumps({\"model\": \"gpt-image-2\", \"prompt\": \"flat icon of a green panda, dark background\",\n                     \"quality\": \"low\", \"size\": \"1024x1024\", \"n\": 1, \"response_format\": \"b64_json\"}).encode(),\n    headers={\"Authorization\": \"Bearer {{KEY}}\", \"Content-Type\": \"application/json\"})\nresp = json.load(urllib.request.urlopen(req, timeout=300))\nopen(\"image.png\", \"wb\").write(base64.b64decode(resp[\"data\"][0][\"b64_json\"]))\nprint(\"готово: image.png\")",
            "mac": "curl https://api.aikeysforyou.com/v1/images/generations \\\n  -H \"Authorization: Bearer {{KEY}}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"gpt-image-2\", \"prompt\": \"flat icon of a green panda, dark background\", \"quality\": \"low\", \"size\": \"1024x1024\", \"n\": 1, \"response_format\": \"b64_json\"}' \\\n  | python3 -c \"import sys, json, base64; open('image.png', 'wb').write(base64.b64decode(json.load(sys.stdin)['data'][0]['b64_json']))\"",
            "linux": "curl https://api.aikeysforyou.com/v1/images/generations \\\n  -H \"Authorization: Bearer {{KEY}}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"gpt-image-2\", \"prompt\": \"flat icon of a green panda, dark background\", \"quality\": \"low\", \"size\": \"1024x1024\", \"n\": 1, \"response_format\": \"b64_json\"}' \\\n  | python3 -c \"import sys, json, base64; open('image.png', 'wb').write(base64.b64decode(json.load(sys.stdin)['data'][0]['b64_json']))\""
          }
        },
        {
          "t": {
            "ru": "Сколько списывается",
            "en": "What it costs"
          },
          "p": {
            "ru": "Цены за одну картинку по каждой модели и качеству — в блоке «Картинки» на главной. n=2 списывает вдвое, n=4 — вчетверо. Редактирование готовых картинок (edits) и видео пока не подключены.",
            "en": "Per-image prices for every model and quality are in the “Images” block on the home page. n=2 charges twice, n=4 four times. Editing existing images (edits) and video are not available yet."
          }
        }
      ],
      "after": []
    },
    "audio": {
      "intro": {
        "ru": "Голосовые и записи — в текст тем же ключом. Формат файла любой (mp3, m4a, ogg, wav, webm), конвертируем сами. Цена — за минуту записи, до 15 минут за запрос.",
        "en": "Voice messages and recordings to text with the same key. Any file format (mp3, m4a, ogg, wav, webm), we convert it ourselves. Priced per minute of audio, up to 15 minutes per request."
      },
      "steps": [
        {
          "t": {
            "ru": "Куда и с чем",
            "en": "Where and what"
          },
          "fields": [
            [
              "Endpoint",
              "https://api.aikeysforyou.com/v1/audio/transcriptions"
            ],
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Model",
              "gpt-4o-transcribe"
            ]
          ],
          "p": {
            "ru": "Формат — как у OpenAI Audio: multipart с полями model, file и, по желанию, language (ru, en…) и prompt. Ответ — JSON с полем text. Приложения, которые умеют Whisper, можно направить сюда с моделью whisper-1 — сработает та же.",
            "en": "The format is the OpenAI Audio one: multipart with model, file and optionally language (ru, en…) and prompt. The reply is JSON with a text field. Apps that speak Whisper can be pointed here with model whisper-1 — the same model answers."
          }
        },
        {
          "t": {
            "ru": "Пример запроса",
            "en": "Example request"
          },
          "p": {
            "win": {
              "ru": "В PowerShell проще через Python (python.org): сохраните код как stt.py рядом с файлом и запустите python stt.py.",
              "en": "On PowerShell it is easier via Python (python.org): save the code as stt.py next to the file and run python stt.py."
            },
            "mac": {
              "ru": "В Терминале, файл voice.m4a лежит в текущей папке.",
              "en": "In Terminal, voice.m4a is in the current folder."
            },
            "linux": {
              "ru": "В терминале, файл voice.m4a лежит в текущей папке.",
              "en": "In the terminal, voice.m4a is in the current folder."
            }
          },
          "code": {
            "win": "import json, mimetypes, urllib.request, uuid\n\npath = \"voice.m4a\"                      # любой формат: mp3, m4a, ogg, wav, webm\nb = uuid.uuid4().hex\nfields = [(\"model\", \"gpt-4o-transcribe\"), (\"language\", \"ru\")]\nbody = b\"\".join((\"--%s\\r\\nContent-Disposition: form-data; name=\\\"%s\\\"\\r\\n\\r\\n%s\\r\\n\" % (b, k, v)).encode() for k, v in fields)\nbody += (\"--%s\\r\\nContent-Disposition: form-data; name=\\\"file\\\"; filename=\\\"%s\\\"\\r\\nContent-Type: %s\\r\\n\\r\\n\" % (b, path, mimetypes.guess_type(path)[0] or \"application/octet-stream\")).encode()\nbody += open(path, \"rb\").read() + (\"\\r\\n--%s--\\r\\n\" % b).encode()\nreq = urllib.request.Request(\"https://api.aikeysforyou.com/v1/audio/transcriptions\", data=body,\n    headers={\"Authorization\": \"Bearer {{KEY}}\", \"Content-Type\": \"multipart/form-data; boundary=\" + b})\nprint(json.load(urllib.request.urlopen(req, timeout=300))[\"text\"])",
            "mac": "curl https://api.aikeysforyou.com/v1/audio/transcriptions \\\n  -H \"Authorization: Bearer {{KEY}}\" \\\n  -F model=gpt-4o-transcribe \\\n  -F language=ru \\\n  -F file=@voice.m4a",
            "linux": "curl https://api.aikeysforyou.com/v1/audio/transcriptions \\\n  -H \"Authorization: Bearer {{KEY}}\" \\\n  -F model=gpt-4o-transcribe \\\n  -F language=ru \\\n  -F file=@voice.m4a"
          }
        },
        {
          "t": {
            "ru": "Сколько списывается",
            "en": "What it costs"
          },
          "p": {
            "ru": "Списание — за каждую начатую минуту записи, цена в блоке «Картинки и речь» на главной. Записи длиннее 15 минут режьте на части.",
            "en": "Charged per started minute of audio; the price is in the “Images and speech” block on the home page. Split recordings longer than 15 minutes."
          }
        }
      ],
      "after": []
    },
    "video": {
      "intro": {
        "ru": "Короткие ролики 1–15 секунд тем же ключом. Задача создаётся мгновенно, готовое видео обычно через 10–60 секунд. Цена — за секунду ролика, списывается при создании.",
        "en": "Short 1–15 second clips with the same key. The job is created instantly, the video is usually ready in 10–60 seconds. Priced per second of clip, charged at creation."
      },
      "steps": [
        {
          "t": {
            "ru": "Создать задачу",
            "en": "Create the job"
          },
          "fields": [
            [
              "Endpoint",
              "https://api.aikeysforyou.com/v1/videos/generations"
            ],
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Model",
              "grok-imagine-video"
            ]
          ],
          "p": {
            "ru": "JSON: model, prompt, duration (1–15), resolution (480p или 720p), aspect_ratio (16:9, 9:16, 1:1). Для видео из картинки добавьте image — data-URL картинки. В ответе request_id и списанная сумма.",
            "en": "JSON: model, prompt, duration (1–15), resolution (480p or 720p), aspect_ratio (16:9, 9:16, 1:1). For image-to-video add image — a data URL of the picture. The reply has request_id and the charged amount."
          }
        },
        {
          "t": {
            "ru": "Дождаться результата",
            "en": "Wait for the result"
          },
          "fields": [
            [
              "Статус",
              "GET https://api.aikeysforyou.com/v1/videos/{request_id}"
            ]
          ],
          "p": {
            "ru": "Опрашивайте раз в 5 секунд, пока status не станет completed — тогда в ответе video.url со ссылкой на mp4. Готовый пример на Python ниже.",
            "en": "Poll every 5 seconds until status is completed — then the reply has video.url with the mp4 link. A ready Python example is below."
          },
          "code": {
            "win": "import json, time, urllib.request\n\nH = {\"Authorization\": \"Bearer {{KEY}}\", \"Content-Type\": \"application/json\"}\nbody = {\"model\": \"grok-imagine-video\", \"prompt\": \"a paper boat sailing down a rainy street, cinematic\",\n        \"duration\": 5, \"resolution\": \"480p\", \"aspect_ratio\": \"16:9\"}\n# картинка на входе (дороже): body[\"image\"] = \"data:image/png;base64,...\"\nreq = urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/generations\", data=json.dumps(body).encode(), headers=H)\njob = json.load(urllib.request.urlopen(req, timeout=120))\nprint(\"задача:\", job[\"request_id\"], \"списано:\", job[\"charged_tokens\"])\nwhile True:\n    time.sleep(5)\n    st = json.load(urllib.request.urlopen(urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/\" + job[\"request_id\"], headers=H), timeout=60))\n    print(st[\"status\"], st.get(\"progress\"))\n    if st[\"status\"] == \"completed\":\n        print(\"видео:\", st[\"video\"][\"url\"]); break\n    if st[\"status\"] in (\"failed\", \"error\"):\n        print(\"не получилось\"); break",
            "mac": "import json, time, urllib.request\n\nH = {\"Authorization\": \"Bearer {{KEY}}\", \"Content-Type\": \"application/json\"}\nbody = {\"model\": \"grok-imagine-video\", \"prompt\": \"a paper boat sailing down a rainy street, cinematic\",\n        \"duration\": 5, \"resolution\": \"480p\", \"aspect_ratio\": \"16:9\"}\n# картинка на входе (дороже): body[\"image\"] = \"data:image/png;base64,...\"\nreq = urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/generations\", data=json.dumps(body).encode(), headers=H)\njob = json.load(urllib.request.urlopen(req, timeout=120))\nprint(\"задача:\", job[\"request_id\"], \"списано:\", job[\"charged_tokens\"])\nwhile True:\n    time.sleep(5)\n    st = json.load(urllib.request.urlopen(urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/\" + job[\"request_id\"], headers=H), timeout=60))\n    print(st[\"status\"], st.get(\"progress\"))\n    if st[\"status\"] == \"completed\":\n        print(\"видео:\", st[\"video\"][\"url\"]); break\n    if st[\"status\"] in (\"failed\", \"error\"):\n        print(\"не получилось\"); break",
            "linux": "import json, time, urllib.request\n\nH = {\"Authorization\": \"Bearer {{KEY}}\", \"Content-Type\": \"application/json\"}\nbody = {\"model\": \"grok-imagine-video\", \"prompt\": \"a paper boat sailing down a rainy street, cinematic\",\n        \"duration\": 5, \"resolution\": \"480p\", \"aspect_ratio\": \"16:9\"}\n# картинка на входе (дороже): body[\"image\"] = \"data:image/png;base64,...\"\nreq = urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/generations\", data=json.dumps(body).encode(), headers=H)\njob = json.load(urllib.request.urlopen(req, timeout=120))\nprint(\"задача:\", job[\"request_id\"], \"списано:\", job[\"charged_tokens\"])\nwhile True:\n    time.sleep(5)\n    st = json.load(urllib.request.urlopen(urllib.request.Request(\"https://api.aikeysforyou.com/v1/videos/\" + job[\"request_id\"], headers=H), timeout=60))\n    print(st[\"status\"], st.get(\"progress\"))\n    if st[\"status\"] == \"completed\":\n        print(\"видео:\", st[\"video\"][\"url\"]); break\n    if st[\"status\"] in (\"failed\", \"error\"):\n        print(\"не получилось\"); break"
          }
        },
        {
          "t": {
            "ru": "Сколько списывается",
            "en": "What it costs"
          },
          "p": {
            "ru": "Цена за секунду по разрешению — в блоке «Картинки, речь и видео» на главной; видео из картинки дороже (плюс фиксированная надбавка за входную картинку). Если задачу не удалось создать, токены возвращаются.",
            "en": "Per-second prices by resolution are in the “Images, speech and video” block on the home page; image-to-video costs more (plus a fixed surcharge for the input image). If the job cannot be created, the tokens are returned."
          }
        }
      ],
      "after": []
    },
    "n8n": {
      "intro": {
        "ru": "Узлы OpenAI и AI Agent в n8n. Главное — сменить адрес: без него n8n шлёт ключ в OpenAI и получает «Incorrect API key provided».",
        "en": "OpenAI and AI Agent nodes in n8n. The key point is the address: without it n8n sends the key to OpenAI and gets “Incorrect API key provided”."
      },
      "steps": [
        {
          "t": {
            "ru": "Создать учётку OpenAI",
            "en": "Create an OpenAI credential"
          },
          "p": {
            "ru": "Credentials → Create credential → OpenAI (или прямо из узла OpenAI Chat Model: Credential → Create new).",
            "en": "Credentials → Create credential → OpenAI (or right from the OpenAI Chat Model node: Credential → Create new)."
          }
        },
        {
          "t": {
            "ru": "Вписать ключ и адрес",
            "en": "Enter the key and the address"
          },
          "p": {
            "ru": "Поле Base URL обязательно поменять — вместе с /v1 на конце. Organization ID оставьте пустым. Сохраните: зелёная надпись «Connection tested successfully» — всё верно.",
            "en": "You must change Base URL — with /v1 at the end. Leave Organization ID empty. Save: a green “Connection tested successfully” means it is right."
          },
          "fields": [
            [
              "API Key",
              "{{KEY}}"
            ],
            [
              "Base URL",
              "https://api.aikeysforyou.com/v1"
            ]
          ]
        },
        {
          "t": {
            "ru": "Выбрать модель",
            "en": "Choose a model"
          },
          "p": {
            "ru": "В узле OpenAI Chat Model в поле Model переключите From list на By ID и впишите claude-sonnet-5 (или claude-opus-5, claude-haiku-4-5). Если в узле есть переключатель Use Responses API — выключите его: модели Claude через него не работают.",
            "en": "In the OpenAI Chat Model node switch Model from From list to By ID and type claude-sonnet-5 (or claude-opus-5, claude-haiku-4-5). If the node has a Use Responses API toggle, turn it off: Claude models do not work through it."
          }
        }
      ],
      "after": []
    }
  },
  "errors": [
    {
      "id": "invalid-token",
      "title": "401, Invalid token",
      "symptoms": "Ключ отклоняется сразу после запуска запроса.",
      "reason": "Ключ скопирован не целиком, с пробелом в конце, или его остаток уже перенесён на другой ключ.",
      "fix": [
        "Проверьте ключ в кабинете."
      ]
    },
    {
      "id": "invalid-api-key",
      "title": "Authentication Fails, invalid api key",
      "symptoms": "Клиент сообщает, что ключ недействителен, хотя он вставлен верно.",
      "reason": "Программа шлёт ключ не к нам, а на сайт самой модели — DeepSeek, OpenAI и другие.",
      "fix": [
        "В Cline, Roo Code и Kilo Code выберите провайдер OpenAI Compatible и укажите Base URL: https://api.aikeysforyou.com/v1.",
        "Ключ Aikeys работает только с этим адресом."
      ]
    },
    {
      "id": "model-not-found",
      "title": "404, model not found",
      "symptoms": "Подключение есть, но выбранная модель не найдена.",
      "reason": "Либо имя модели написано неточно, либо адрес API указан не так.",
      "fix": [
        "Сверьте ID со списком на главной странице.",
        "Попробуйте адрес с /v1 на конце или без него."
      ]
    },
    {
      "id": "not-enough-funds",
      "title": "Недостаточно средств",
      "symptoms": "Запрос не запускается из-за отсутствия доступного остатка на ключе.",
      "reason": "Кончилось пополнение на ключе.",
      "fix": [
        "Докупите пакет и перенесите остаток на рабочий ключ прямо в кабинете.",
        "Менять ключ в программе не придётся."
      ]
    },
    {
      "id": "service-overloaded",
      "title": "503, сервис перегружен",
      "symptoms": "Запрос временно не обрабатывается.",
      "reason": "Редкая временная ошибка.",
      "fix": [
        "Повторите запрос.",
        "Если ошибка повторяется, напишите в чат заказа."
      ]
    },
    {
      "id": "quota-reserved",
      "title": "pre_consume_token_quota_failed",
      "symptoms": "Клиент не запускает запрос до получения ответа.",
      "reason": "Программа резервирует под ответ слишком много.",
      "fix": [
        "В настройках модели уменьшите Max Output Tokens до 8192, а Context Window Size — до 256000."
      ]
    },
    {
      "id": "empty-response",
      "title": "Пустой ответ у DeepSeek, Qwen или GLM",
      "symptoms": "Модель отвечает пустым сообщением или почти сразу заканчивает ответ.",
      "reason": "Эти модели сначала думают, и короткий лимит ответа съедается размышлением.",
      "fix": [
        "Для DeepSeek задайте max_tokens от 4000, для Qwen и GLM — от 512."
      ]
    },
    {
      "id": "non-streaming",
      "title": "Ответ приходит целиком, а не по буквам",
      "symptoms": "Текст появляется одним сообщением после завершения генерации.",
      "reason": "claude-opus-5, claude-haiku-4-5 и claude-sonnet-4-6 присылают ответ целиком, а не по буквам.",
      "fix": [
        "На работу это не влияет."
      ]
    },
    {
      "id": "cline-identity",
      "title": "Модель называет себя «Cline»",
      "symptoms": "В ответе модель представляется именем агента, а не собственным именем.",
      "reason": "Так её велел сам Cline своим системным промптом.",
      "fix": [
        "Спросите ту же модель вне агента — она назовёт настоящее имя."
      ]
    }
  ],
  "models": {
    "providers": [
      {
        "id": "openai",
        "name": "OpenAI",
        "models": [
          {
            "id": "gpt-6-astra",
            "name": "GPT-6 Astra",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-6.1-sol",
            "name": "GPT-6.1 Sol",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-6-sol",
            "name": "GPT-6 Sol",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-5.6-sol",
            "name": "GPT-5.6 Sol",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-5.5",
            "name": "GPT-5.5",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-5.6-terra",
            "name": "GPT-5.6 Terra",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-6-luna",
            "name": "GPT-6 Luna",
            "kind": "Текст / код"
          },
          {
            "id": "gpt-5.6-luna",
            "name": "GPT-5.6 Luna",
            "kind": "Текст / код"
          }
        ]
      },
      {
        "id": "anthropic",
        "name": "Anthropic",
        "models": [
          {
            "id": "claude-fable-5-1",
            "name": "Fable 5.1",
            "kind": "Текст / код"
          },
          {
            "id": "claude-fable-5",
            "name": "Fable 5",
            "kind": "Текст / код"
          },
          {
            "id": "claude-opus-5-5",
            "name": "Opus 5.5",
            "kind": "Текст / код"
          },
          {
            "id": "claude-opus-5",
            "name": "Opus 5",
            "kind": "Текст / код"
          },
          {
            "id": "claude-opus-4-8",
            "name": "Opus 4.8",
            "kind": "Текст / код"
          },
          {
            "id": "claude-opus-4-7",
            "name": "Opus 4.7",
            "kind": "Текст / код"
          },
          {
            "id": "claude-opus-4-6",
            "name": "Opus 4.6",
            "kind": "Текст / код"
          },
          {
            "id": "claude-sonnet-5",
            "name": "Sonnet 5",
            "kind": "Текст / код"
          },
          {
            "id": "claude-sonnet-4-6",
            "name": "Sonnet 4.6",
            "kind": "Текст / код"
          },
          {
            "id": "claude-haiku-4-5",
            "name": "Haiku 4.5",
            "kind": "Текст / код"
          }
        ]
      },
      {
        "id": "google",
        "name": "Google",
        "models": [
          {
            "id": "gemini-3.1-pro",
            "name": "Gemini 3.1 Pro",
            "kind": "Текст / код"
          },
          {
            "id": "gemini-3.8-flash",
            "name": "Gemini 3.8 Flash",
            "kind": "Текст / код"
          },
          {
            "id": "gemini-3.7-flash",
            "name": "Gemini 3.7 Flash",
            "kind": "Текст / код"
          },
          {
            "id": "gemini-3.6-flash",
            "name": "Gemini 3.6 Flash",
            "kind": "Текст / код"
          }
        ]
      },
      {
        "id": "xai",
        "name": "xAI / Cursor",
        "models": [
          {
            "id": "grok-4.7",
            "name": "Grok 4.7",
            "kind": "Текст / код"
          },
          {
            "id": "grok-4.6",
            "name": "Grok 4.6",
            "kind": "Текст / код"
          },
          {
            "id": "grok-4.5",
            "name": "Grok 4.5",
            "kind": "Текст / код"
          },
          {
            "id": "composer-2.5-fast",
            "name": "Composer 2.5 Fast",
            "kind": "Текст / код"
          }
        ]
      },
      {
        "id": "asia",
        "name": "Азиатские модели",
        "models": [
          {
            "id": "qwen3.8-max",
            "name": "Qwen 3.8 Max",
            "kind": "Текст / код"
          },
          {
            "id": "kimi-k3",
            "name": "Kimi K3",
            "kind": "Текст / код"
          },
          {
            "id": "glm-5.3",
            "name": "GLM 5.3",
            "kind": "Текст / код"
          },
          {
            "id": "glm-5.2",
            "name": "GLM 5.2",
            "kind": "Текст / код"
          },
          {
            "id": "glm-5-turbo",
            "name": "GLM 5 Turbo",
            "kind": "Текст / код"
          },
          {
            "id": "hy4-preview",
            "name": "Hy4 Preview",
            "kind": "Текст / код"
          },
          {
            "id": "kimi-k2.7-code",
            "name": "Kimi K2.7 Code",
            "kind": "Текст / код"
          },
          {
            "id": "qwen3.8-flash",
            "name": "Qwen 3.8 Flash",
            "kind": "Текст / код"
          },
          {
            "id": "deepseek-v4-pro",
            "name": "DeepSeek v4 Pro",
            "kind": "Текст / код"
          },
          {
            "id": "glm-5.3-flash",
            "name": "GLM 5.3 Flash",
            "kind": "Текст / код"
          },
          {
            "id": "minimax-m3",
            "name": "MiniMax M3",
            "kind": "Текст / код"
          },
          {
            "id": "deepseek-v4.1-flash",
            "name": "DeepSeek v4.1 Flash",
            "kind": "Текст / код"
          },
          {
            "id": "deepseek-v4-flash",
            "name": "DeepSeek v4 Flash",
            "kind": "Текст / код"
          }
        ]
      },
      {
        "id": "other",
        "name": "Остальное",
        "models": [
          {
            "id": "mimo-v2.5",
            "name": "MiMo v2.5",
            "kind": "Текст / код"
          }
        ]
      }
    ],
    "images": [
      {
        "id": "grok-imagine-image",
        "name": "Grok Imagine Image",
        "kind": "Изображения"
      },
      {
        "id": "nano-banana-2",
        "name": "Nano Banana 2",
        "kind": "Изображения"
      },
      {
        "id": "gpt-image-2.5-flare",
        "name": "GPT Image 2.5 Flare",
        "kind": "Изображения"
      },
      {
        "id": "gpt-image-2.5-sunburst",
        "name": "GPT Image 2.5 Sunburst",
        "kind": "Изображения"
      },
      {
        "id": "gpt-image-2",
        "name": "GPT Image 2",
        "kind": "Изображения"
      }
    ],
    "audio": [],
    "video": [
      {
        "id": "grok-imagine-video",
        "name": "Grok Imagine Video",
        "kind": "Видео"
      }
    ]
  },
  "savings": {
    "title": "Как тратить меньше",
    "intro": "Несколько настроек и привычек, которые помогают не расходовать контекст впустую.",
    "tips": [
      {
        "title": "Подбирайте модель под задачу",
        "body": "Для коротких вопросов и обычного чата используйте быстрые GPT-модели. Claude особенно полезен, когда нужен большой контекст: код, файлы или длинные тексты."
      },
      {
        "title": "Начинайте новый диалог для новой задачи",
        "body": "В Claude Code используйте /clear, а в Cline — «новая задача». Чем короче история диалога, тем меньше лишнего контекста уходит в каждый следующий запрос."
      },
      {
        "title": "Прикладывайте только нужные файлы",
        "body": "Агент отправляет в запрос всё, что вы ему дали. Оставляйте только файлы, которые действительно нужны для текущей задачи."
      },
      {
        "title": "Ограничьте ответ в Cline и Roo",
        "body": "Поставьте Max Output Tokens: 8192 и Context Window Size: 256000. Слишком большой лимит заставляет расширение резервировать лишний объём под ответ."
      },
      {
        "title": "Не завышайте Reasoning Effort",
        "body": "Для повседневных задач обычно достаточно Low или Medium. Высокий уровень рассуждений делает ответы заметно длиннее."
      },
      {
        "title": "Рутину отдавайте быстрым моделям",
        "body": "Черновики, короткие правки и простые вопросы лучше решать быстрой моделью, а сложные задачи с большим контекстом оставлять для более сильной."
      }
    ]
  },
  "generatedAt": "2026-10-13T12:48:36.563Z"
};
