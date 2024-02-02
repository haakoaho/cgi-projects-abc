namespace CGI_Utility
{
    public partial class Program
    {

        [STAThread]
        public static void Main(string[] args)
        {
            int[] solution = TwoSum(new int[] { -5, 100, 200, -1000, 5, 777, 0 }, 0);
            Console.WriteLine(solution[0]);
            Console.WriteLine(solution[1]);
        }

        public static int[] TwoSum(int[] nums, int target)
        {
            var indexDict = new Dictionary<int, int>();
            for (int i = 0; i < nums.Length; i++)
            {
                indexDict.Add(nums[i], i); //index gets scrambled by sorting so we need a way to find the original index. This is safe as the task specifies that no elements are repeated
                // TC for dict creation is O(N) as we iterate all elements of the array
            }

            Array.Sort(nums); // sort to be able to use two pointer approach. The task does NOT specify sorted array
            // TC for sort is O(N log N). We know nothing about the array except that each element appears once so the optimal sorting will be a generic sorting algorithm provided by the library
            if (nums.Length == 2) return nums;
            int left = 0;
            int right = nums.Length - 1;
            while (left < right)
            {
                if (nums[left] + nums[right] > target) right--;
                else if (nums[left] + nums[right] < target) left++;
                else return new int[] { indexDict.GetValueOrDefault(nums[left]), indexDict.GetValueOrDefault(nums[right]) };
                // TC for two pointers is O(N) as we move closer to the solution for every iteration 
            }
            throw new Exception("Invalid array");
        }

        // O(N) + O(N + Log N) + O(N) = O(N log N)
        // While the library sorting is efficient, it will start to take the longest time if the input becomes very large. 



    }
}