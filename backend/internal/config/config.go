package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	GinMode     string
	FrontendURL string
	DatabaseURL string

	JWTAccessSecret  string
	JWTRefreshSecret string

	GoogleClientID     string
	GoogleClientSecret string
}

// Load membaca file .env (jika ada) lalu mengembalikan Config yang sudah tervalidasi.
// Panggil ini SEKALI di awal main(), sebelum apapun yang lain.
func Load() Config {
	// Di production (Railway/Render/dst), file .env biasanya tidak ada
	if err := godotenv.Load(); err != nil {
		log.Println("tidak menemukan file .env, menggunakan environment variable sistem")
	}

	cfg := Config{
		Port:        getEnv("PORT", "8080"),
		GinMode:     getEnv("GIN_MODE", "debug"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
		DatabaseURL: getEnv("DATABASE_URL", ""),

		JWTAccessSecret:  getEnv("JWT_ACCESS_SECRET", ""),
		JWTRefreshSecret: getEnv("JWT_REFRESH_SECRET", ""),

		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
	}

	cfg.validate()

	return cfg
}

// validate memastikan konfigurasi wajib tidak kosong.
// Fail fast di sini jauh lebih baik daripada error samar-samar
// saat request pertama masuk (misal token JWT gagal ditandatangani).
func (c Config) validate() {
	required := map[string]string{
		"DATABASE_URL":       c.DatabaseURL,
		"JWT_ACCESS_SECRET":  c.JWTAccessSecret,
		"JWT_REFRESH_SECRET": c.JWTRefreshSecret,
	}

	for key, value := range required {
		if value == "" {
			log.Fatalf("environment variable %s wajib diisi, cek file .env kamu", key)
		}
	}
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
