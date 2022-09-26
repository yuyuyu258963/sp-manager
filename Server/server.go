package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		c.Header("Access-Control-Allow-Origin", "*") // 可将将 * 替换为指定的域名
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}

func Pang(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"msg": "你好",
	})
}

func getManagerData(c *gin.Context) {
	limit, err := strconv.ParseInt(c.DefaultQuery("limit", "1"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{})
	}
	page, err := strconv.ParseInt(c.DefaultQuery("page", "0"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{})
	}
	collection := initDB("fund_manager")
	managers := findWithPages(collection, limit, page)
	c.JSON(http.StatusOK, gin.H{
		"code":     200,
		"managers": managers,
	})
}

func Router() {
	router := gin.Default()
	router.Use(Cors())
	router.GET("/ping", Pang)
	router.GET("/managerList", getManagerData)

	router.Run(":8081")
}
