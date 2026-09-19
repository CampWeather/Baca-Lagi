package models

import (
	"time"

	"gorm.io/gorm"
)

type RefreshToken struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	UserID    string         `gorm:"type:uuid;not null;index" json:"user_id"`
	User      User           `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	TokenHash string         `gorm:"size:64;uniqueIndex;not null" json:"-"`
	ExpiresAt time.Time      `gorm:"not null;index" json:"expires_at"`
	RevokedAt *time.Time     `json:"revoked_at,omitempty"`
	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (RefreshToken) TableName() string {
	return "refresh_tokens"
}
