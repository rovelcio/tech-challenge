build-FunctionSearchMovies:
	$(MAKE) HANDLER=src/functions/FunctionSearchMovies.ts build-lambda-typescript

build-FunctionBookmarkMovie:
	$(MAKE) HANDLER=src/functions/FunctionBookmarkMovie.ts build-lambda-typescript

build-FunctionListBookmarkedMovies:
	$(MAKE) HANDLER=src/functions/FunctionListBookmarkedMovies.ts build-lambda-typescript

build-lambda-typescript:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-TypescriptRuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	sed -i 's/condoplay-core/condoplay-dependency-layer/g' "$(ARTIFACTS_DIR)/nodejs/package.json"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"
