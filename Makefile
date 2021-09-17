build-FunctionSearchMovies:
	$(MAKE) HANDLER=src/functions/SearchMovies.ts build-lambda-typescript

build-FunctionBookmarkMovie:
	$(MAKE) HANDLER=src/functions/BookmarkMovie.ts build-lambda-typescript

build-FunctionListBookmarkedMovies:
	$(MAKE) HANDLER=src/functions/ListBookmarkedMovies.ts build-lambda-typescript

build-lambda-typescript:
	rm -rf node_modules
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-LayerTypescriptDependencies:
	rm -rf node_modules
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	sed -i 's/tech-challenge/tech-challenge-dependency-layer/g' "$(ARTIFACTS_DIR)/nodejs/package.json"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"
