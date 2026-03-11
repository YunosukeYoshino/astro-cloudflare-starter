export default {
  // ステージされた設定ファイルも含めて Biome を実行する
  '**/*.{js,ts,jsx,tsx,json,jsonc,astro,mjs,cjs}': ['biome check --write'],
};
