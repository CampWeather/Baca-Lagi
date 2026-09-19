package routers

import (
	"github.com/CampWeather/Baca-Lagi/backend/internal/handlers"
	"github.com/CampWeather/Baca-Lagi/backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB, frontendURL string) *gin.Engine {
	router := gin.Default()
	if err := router.SetTrustedProxies(nil); err != nil {
		panic(err)
	}

	router.Use(middleware.CORS(frontendURL))

	router.GET("/api/v1/health", handlers.HealthCheck)
	router.GET("/api/v1/books", handlers.GetBooks(db))
	router.POST("/api/v1/books", handlers.CreateBook(db))

	return router
}
