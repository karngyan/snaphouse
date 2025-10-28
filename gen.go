package main

//go:generate go tool cfgx generate -i config/config.dev.toml -o config/config.gen.go
//go:generate go tool sqlc generate
