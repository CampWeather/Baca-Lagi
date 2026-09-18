package routers

import (
	"github.com/CampWeather/Baca-Lagi/backend/internal/handlers"
	"github.com/CampWeather/Baca-Lagi/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter(frontendURL string) *gin.Engine {
	router := gin.Default()

	router.Use(middleware.CORS(frontendURL))

	router.GET("/api/v1/health", handlers.HealthCheck)
	router.GET("/api/v1/books", handlers.GetBooks)

	return router
}
