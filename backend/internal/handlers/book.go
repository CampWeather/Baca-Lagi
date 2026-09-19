package handlers

import (
	"net/http"
	"strings"

	"github.com/CampWeather/Baca-Lagi/backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateBookRequest struct {
	Title       string `json:"title" binding:"required"`
	Author      string `json:"author" binding:"required"`
	Description string `json:"description"`
	Price       int64  `json:"price" binding:"required,gt=0"`
	Condition   string `json:"condition" binding:"required"`
}

func GetBooks(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var books []models.Book

		if err := db.Order("created_at DESC").Find(&books).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "gagal mengambil data buku",
			})
			return
		}

		c.JSON(http.StatusOK, books)
	}
}

func CreateBook(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request CreateBookRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "data buku tidak valid",
				"details": err.Error(),
			})
			return
		}

		request.Title = strings.TrimSpace(request.Title)
		request.Author = strings.TrimSpace(request.Author)
		request.Description = strings.TrimSpace(request.Description)
		request.Condition = strings.ToLower(strings.TrimSpace(request.Condition))

		if request.Title == "" || request.Author == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "judul dan penulis wajib diisi",
			})
			return
		}

		if !validBookCondition(request.Condition) {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "kondisi harus salah satu dari: seperti_baru, baik, cukup, atau buruk",
			})
			return
		}

		book := models.Book{
			Title:       request.Title,
			Author:      request.Author,
			Description: request.Description,
			Price:       request.Price,
			Condition:   request.Condition,
			Status:      "available",
		}

		if err := db.Create(&book).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "gagal menyimpan buku",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "buku berhasil ditambahkan",
			"data":    book,
		})
	}
}

func validBookCondition(condition string) bool {
	switch condition {
	case "seperti_baru", "baik", "cukup", "buruk":
		return true
	default:
		return false
	}
}
