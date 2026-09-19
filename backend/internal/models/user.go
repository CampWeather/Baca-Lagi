package models

import (
	"time"

	"gorm.io/gorm"
)

// User merepresentasikan pengguna marketplace (pembeli/penjual).
// Password bisa kosong jika user daftar via OAuth (Google, dll).
type User struct {
	ID         string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name       string         `gorm:"not null" json:"name"`
	Email      string         `gorm:"uniqueIndex;not null" json:"email"`
	Password   string         `gorm:"" json:"-"`                     // "-" agar tidak ikut ter-serialize ke JSON, kosong jika login via OAuth
	Role       string         `gorm:"default:buyer" json:"role"`     // "buyer", "seller", "admin"
	Provider   string         `gorm:"default:local" json:"provider"` // "local", "google", dst
	ProviderID string         `gorm:"index" json:"-"`                // ID dari provider OAuth, jika ada
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"` // soft delete
}

// TableName eksplisit (opsional, tapi baik untuk konsistensi nama tabel).
func (User) TableName() string {
	return "users"
}
