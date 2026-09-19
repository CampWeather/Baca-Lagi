package models

import "time"

type Book struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	SellerID    string    `gorm:"type:uuid;not null;index" json:"seller_id"`
	Seller      User      `gorm:"foreignKey:SellerID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT" json:"seller,omitempty"`
	Title       string    `gorm:"size:255;not null" json:"title"`
	Author      string    `gorm:"size:255;not null" json:"author"`
	Description string    `gorm:"type:text" json:"description"`
	Price       int64     `gorm:"not null;check:price > 0" json:"price"`
	Condition   string    `gorm:"size:50;not null" json:"condition"`
	Status      string    `gorm:"size:30;not null;default:available" json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (Book) TableName() string {
	return "books"
}
