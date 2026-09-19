package database

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/CampWeather/Baca-Lagi/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Connect membuka koneksi PostgreSQL, memeriksa koneksi, mengatur
// connection pool, lalu menjalankan migrasi tabel aplikasi.
func Connect(databaseURL string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("gagal membuka koneksi database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("gagal mendapatkan instance database: %w", err)
	}

	configureConnectionPool(sqlDB)

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("gagal terhubung ke PostgreSQL: %w", err)
	}

	if err := db.AutoMigrate(
		&models.User{},
		&models.Book{},
	); err != nil {
		return nil, fmt.Errorf("gagal menjalankan AutoMigrate: %w", err)
	}

	return db, nil
}

func configureConnectionPool(sqlDB *sql.DB) {
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetConnMaxIdleTime(5 * time.Minute)
	sqlDB.SetConnMaxLifetime(30 * time.Minute)
}
