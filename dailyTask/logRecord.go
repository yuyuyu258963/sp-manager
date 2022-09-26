package main

import (
	"fmt"
	"os"
	"path"
	"time"

	"github.com/sirupsen/logrus"
)

// 创建日志文件夹
func createFolder(logFilePath string) {
	if err := os.MkdirAll(logFilePath, 0777); err != nil {
		fmt.Println("file create failed")
		panic(err)
	}
}

// 检查并打开日志文件
func createLogFile(logFilePath string, fileNameFormat string) *os.File {
	logFileName := fileNameFormat + ".log"
	fileName := path.Join(logFilePath, logFileName)
	checkFile := func(fileName string) {
		if err := checkFile(fileName); err != nil {
			if _, err := os.Create(fileName); err != nil {
				fmt.Println("open file failed")
				panic(err)
			}
		}
	}

	checkFile(fileName)
	src, err := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY, os.ModeAppend)
	if err != nil {
		panic(err)
	}
	return src
}

// 获取日志写入的
// @{``filenameFormat``} 日志文件的前缀
func getLogger(filenameFormat string) (*logrus.Logger, func(newFileNameFormat string)) {
	logFilePath := ""
	if dir, err := os.Getwd(); err == nil {
		logFilePath = dir + "/logs/"
	}
	// 创建日志文件夹
	createFolder(logFilePath)
	if filenameFormat != "null" {
		filenameFormat = time.Now().Format("2006-01-02")
	} else {
		filenameFormat = "log"
	}
	src := createLogFile(logFilePath, filenameFormat)

	logger := logrus.New()
	logger.Out = src
	logger.SetLevel(logrus.DebugLevel)

	logger.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006-01-02 15:04:05",
	})

	// 检查更新当前的时间
	// 还存在个BUG 实现了日志文件的切换 但是文件流不能被关闭，
	return logger, func(newFileNameFormat string) {
		if newFileNameFormat != filenameFormat {
			filenameFormat = newFileNameFormat
			src.Close()
			newSrc := createLogFile(logFilePath, filenameFormat)
			logger.Out = newSrc
		}
	}
}
