package main

import (
	"log"

	"github.com/CampWeather/Baca-Lagi/backend/internal/config"
	"github.com/CampWeather/Baca-Lagi/backend/internal/database"
	"github.com/CampWeather/Baca-Lagi/backend/internal/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	gin.SetMode(cfg.GinMode)

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal(err)
	}
	defer sqlDB.Close()

	router := routers.SetupRouter(db, cfg.FrontendURL)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
