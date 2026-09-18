package main

import (
	"log"

	"github.com/CampWeather/Baca-Lagi/backend/internal/config"
	"github.com/CampWeather/Baca-Lagi/backend/internal/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()

	gin.SetMode(cfg.GinMode)

	router := routers.SetupRouter(cfg.FrontendURL)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
