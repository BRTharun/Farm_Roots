using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class OperationResult
    {
        public bool IsSuccess { get; private set; }
        public string? ErrorMessage { get; private set; }
        private OperationResult(bool isSuccess, string errorMessage)
        {
            IsSuccess = isSuccess;
            ErrorMessage = errorMessage;
        }
        public static OperationResult Success()
        {
            return new OperationResult(true, null);
        }
        public static OperationResult Failure(string errorMessage)
        {
            return new OperationResult(false,errorMessage);
        }
    }
}
