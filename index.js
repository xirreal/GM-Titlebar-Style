import { createItem, removeItem } from '@goosemod/settings';

const settingsStore = { color: "#f2f2f2" };

const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = settingsStore.color;

export default {
    goosemodHandlers: {
        getSettings: () => [settingsStore],
        loadSettings: ([_loadedSettings]) => {
            settingsStore.color = _loadedSettings.color
        },

        onImport: async () => {
            document.getElementsByTagName("head")[0].prepend(meta);

            createItem('Titlebar Style', ['',
                {
                    type: 'text-and-color',
                    text: 'Titlebar color',
                    initialValue: () => settingsStore.color,
                    oninput: (value) => {
                        settingsStore.color = value;
                    },
                },
            ]);
        },

        onRemove: () => {
            meta.remove();
            removeItem('Titlebar Style');
        },
    }
};