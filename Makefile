main:
	ENV=PRDOCUTION ./bin/www
    
dev:
	./bin/www
    
    
.PHONY: main dev
