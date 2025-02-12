# preload.ts

Each locale directory must contain a `config.json` file with the following structure:

```json
{
	"fields": [
		{
			"fieldId": "field-id",
			"relativeConfigPath": "relative/path/to/field/config/file"
		}
	]
}
```

This structure allows field directories to be nested within a deeper directory hierarchy, without needing to be direct subdirectories of the locale directory. For example, with the following `config.json` in the `en-US` locale directory:

```json
{
	"fields": [
		{
			"fieldId": "primer",
			"relativeConfigPath": "tutorials/primer"
		}
		{
			"fieldId": "advanced",
			"relativeConfigPath": "tutorials/advanced"
		}
	]
}
```

You can place MDX files in `src/app/en-US/tutorials/primer` and `src/app/en-US/tutorials/advanced`, the directory `tutorials` will not be treated as a field directory, but the `primer` and `advanced` directory will be.

Each field directory must contain a `config.json` which defines field properties (see `src/utils/types.ts` for details).
