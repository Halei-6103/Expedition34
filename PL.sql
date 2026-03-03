DROP PROCEDURE IF EXISTS sp_delete_purchases;
DELIMITER //

CREATE PROCEDURE sp_delete_purchases(IN inputpurchaseID INT)
BEGIN 
DELETE FROM Purchases WHERE purchaseID= inputpurchaseID;
END //

DELIMITER ;

