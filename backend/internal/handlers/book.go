package handlers

import (
	"net/http"

	"github.com/CampWeather/Baca-Lagi/backend/internal/models"

	"github.com/gin-gonic/gin"
)

func GetBooks(c *gin.Context) {
	books := []models.Book{
		{
			ID:        1,
			Title:     "The Psychology of Money",
			Author:    "Morgan Housel",
			Price:     50000,
			Condition: "Baik",
		},
		{
			ID:        2,
			Title:     "Sapiens",
			Author:    "Yuval Noah Harari",
			Price:     50000,
			Condition: "Baik",
		},
	}

	c.JSON(http.StatusOK, books)
}
